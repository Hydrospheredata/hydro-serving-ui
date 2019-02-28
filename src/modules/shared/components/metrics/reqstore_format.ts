export interface Entry {
  uid: number;
  data: Uint8Array
}

export interface TsRecord {
  ts: number;
  entries: Entry[];
}

function readInt(b: Uint8Array, offset: number): number {
  const x1 = b[0 + offset] << 24
  const x2 = b[1 + offset] << 16
  const x3 = b[2 + offset] << 8
  const x4 = b[3 + offset] << 0
  return x1 | x2 | x3 | x4
}

function readLong(b: Uint8Array, offset: number): number {
  const head = readInt(b, offset) << 32
  const tail = readInt(b, offset + 4)
  return head | tail
}

export function decodeTsRecord(bytes: Uint8Array): TsRecord[] {
  let offset = 0
  const records = []

  while (offset < bytes.length) {
    const len = readInt(bytes, offset)
    const ts = readLong(bytes, offset + 4)
    const body = new Uint8Array(bytes.slice(offset + 4 + 8, offset + 4 + 8 + len))

    const minUid = readLong(body, 0)
    const count = readInt(body, 8)

    let entryOffset = 12 
    const entries = []
    for(let i=0; i < count; i++) {
       const x = readInt(body, entryOffset) 
       const readBodyOff = entryOffset + 4
       const data = new Uint8Array(body.slice(readBodyOff, readBodyOff + x))
       entries.push(<Entry>{ uid: minUid + i, data: data })
       entryOffset = entryOffset + x + 4
    } 
    records.push(<TsRecord>{ ts: ts, entries: entries })
    offset = offset + 4 + 8 + len 
  }
  return records;
}
