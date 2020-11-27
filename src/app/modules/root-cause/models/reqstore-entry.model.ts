export interface ReqstoreEntry {
  uid: string;
  ts: string;
  request: any;
  response: any;
}

export interface ReqstoreLog {
  [timestamp: string]: ReqstoreEntry[];
}
