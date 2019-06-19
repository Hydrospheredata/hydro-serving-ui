export interface ReqstoreEntry {
    uid: string;
    request: any;
    response: any;
}

export interface ReqstoreLog {
    [timestamp: string]: ReqstoreEntry[];
}
