export interface IReqstoreEntry {
    uid: string;
    request: any;
    response: any;
}

export interface IReqstoreLog {
    [timestamp: string]: IReqstoreEntry[];
}
