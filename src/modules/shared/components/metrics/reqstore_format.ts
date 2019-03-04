import * as protos from './compiled';

type PredictRequest = protos.hydrosphere.tensorflow.serving.PredictRequest;
const PredictRequest = protos.hydrosphere.tensorflow.serving.PredictRequest;

type PredictResponse = protos.hydrosphere.tensorflow.serving.PredictRequest;
const PredictResponse = protos.hydrosphere.tensorflow.serving.PredictRequest;

type ExecutionError = protos.hydrosphere.monitoring.ExecutionError;
const ExecutionError = protos.hydrosphere.monitoring.ExecutionError;

export interface Entry {
  uid: number;
  data: Uint8Array;
}

export interface TsRecord {
  ts: number;
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

function decodeRespOrError(data: Uint8Array): PredictResponse | ExecutionError {
  const num = data[0];
  const body = new Uint8Array(data.slice(1, data.length));
  switch (num) {
    case 2:
      return decode(body, ExecutionError.decode);
    case 3:
      return decode(body, PredictResponse.decode);
    default:
      throw new Error(`Invalid Resp Or Error number:${num}`);
  }
}

export function asServingReqRes(data: Uint8Array): ReqRes {
  const reqSize = data[0];
  const respSize = data[1];

  const reqBody = new Uint8Array(data.slice(2, 2 + reqSize));
  const respBody = new Uint8Array(data.slice(2 + reqSize, 2 + reqSize + respSize));

  const req = decode(reqBody, PredictRequest.decode);
  const resp = decodeRespOrError(respBody);
  return { req, resp } as ReqRes;
}

export function decodeTsRecord(bytes: Uint8Array): TsRecord[] {
  let offset = 0;
  const records = [];

  while (offset < bytes.length) {
    const len = readInt(bytes, offset);
    const ts = readLong(bytes, offset + 4);
    const body = new Uint8Array(bytes.slice(offset + 4 + 8, offset + 4 + 8 + len));

    const minUid = readLong(body, 0);
    const count = readInt(body, 8);

    let entryOffset = 12;
    const entries = [];
    for (let i = 0; i < count; i++) {
       const x = readInt(body, entryOffset);
       const readBodyOff = entryOffset + 4;
       const data = new Uint8Array(body.slice(readBodyOff, readBodyOff + x));
       entries.push({ uid: minUid + i, data } as Entry);
       entryOffset = entryOffset + x + 4;
    }
    records.push({ ts, entries } as TsRecord);
    offset = offset + 4 + 8 + len;
  }
  return records;
}
