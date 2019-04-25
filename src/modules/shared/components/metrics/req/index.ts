import * as bf from 'bytebuffer';
import * as protos from './compiled';

export type PredictRequest = protos.hydrosphere.tensorflow.serving.PredictRequest;
const PredictRequest = protos.hydrosphere.tensorflow.serving.PredictRequest;

export type PredictResponse = protos.hydrosphere.tensorflow.serving.PredictResponse;
const PredictResponse = protos.hydrosphere.tensorflow.serving.PredictResponse;

type ExecutionError = protos.hydrosphere.monitoring.ExecutionError;
const ExecutionError = protos.hydrosphere.monitoring.ExecutionError;

export interface Entry {
  uid: string;
  data: Uint8Array;
}

export interface TsRecord {
  ts: string;
  entries: Entry[];
}

export interface ReqRes {
  req: PredictRequest;
  resp: PredictResponse | ExecutionError;
}

function readInt(b: Uint8Array, offset: number): number {
  const x1 = b[0 + offset] << 24;
  const x2 = b[1 + offset] << 16;
  const x3 = b[2 + offset] << 8;
  const x4 = b[3 + offset] << 0;
  return x1 | x2 | x3 | x4;
}

function readLong(b: Uint8Array, offset: number): number {
  const head = readInt(b, offset) << 32;
  const tail = readInt(b, offset + 4);
  return head | tail;
}

function decode<A>(data: Uint8Array, f: (Uint8Array) => A): A {
  const header = data[0];
  let body;
  if (header === 0) {
    body = new Uint8Array([]);
  } else {
    body = new Uint8Array(data.slice(1, data.length));
  }
  return f(body);
}

export function asServingReqRes(data: Uint8Array): ReqRes {
  const reqSize = readInt(data, 0);
  const respSize = readInt(data, 4);

  const reqBody = new Uint8Array(data.slice(8, 8 + reqSize));
  const respBody = new Uint8Array(data.slice(8 + reqSize, 8 + reqSize + respSize));
  const req = decode(reqBody, PredictRequest.decode);
  const resp = decodeRespOrError(respBody);
  return { req, resp } as ReqRes;
}

function decodeRespOrError(data: Uint8Array): PredictResponse | ExecutionError {
  const num = readInt(data, 0);
  const body = new Uint8Array(data.slice(4, data.length));
  switch (num) {
    case 2:
      return decode(body, ExecutionError.decode);
    case 3:
      return decode(body, PredictResponse.decode);
    default:
      throw new Error(`Invalid Resp Or Error number:${num}`);
  }
}

export function decodeTsRecord(bytes: Uint8Array): TsRecord[] {
  const bb = bf.wrap(bytes);
  const records: TsRecord[] = [];

  while (bb.offset < bb.limit) {
    const ts = bb.readLong().toString();
    const unique = bb.readLong().toString();
    const len = bb.readInt();
    const data = new Uint8Array(bb.readBytes(len).toArrayBuffer());

    const entries: Entry[] = [];
    entries.push({uid: unique, data});
    const record = {ts, entries};
    records.push(record);

  }

  const resultMap: Map<string, TsRecord> = records.reduce(function(map: Map<string, TsRecord>, obj) {
    if (map.has(obj.ts)) {
        const prev = map[obj.ts];
        map[obj.ts] = {ts: obj.ts, entries: prev.entries.concat(obj.entries)};
    } else {
      map[obj.ts] = obj;
    }
    return map;
  }, new Map<string, TsRecord>());

  return records;
}
