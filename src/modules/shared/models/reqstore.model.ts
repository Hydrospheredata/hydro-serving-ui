export interface ReqstoreEntry {
    ts: string;
    request: any;
    response: any;
}

export interface ReqstoreLog {
    [timestamp: string]: ReqstoreEntry[];
}
