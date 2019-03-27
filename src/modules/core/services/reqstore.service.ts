import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { decodeTsRecord, asServingReqRes } from '@shared/components/metrics/reqstore_format';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface IReqstoreLog {
    [record: string]: Array<{
        uid: number;
        request: any;
        response: any;
    }>;
}

@Injectable()
export class ReqstoreService {
    private baseReqstoreUrl: string;

    constructor(
        private http: HttpService
      ) {
        this.baseReqstoreUrl = `${environment.reqstoreUrl}`;
      }

    public getData(id, from, to): Observable<any> {
        return this.http.get(`${this.baseReqstoreUrl}/${id}/get?from=${from}&to=${to}`, {
            responseType: 'arraybuffer',
        }).pipe(
            map((_: any) => {
                const x = new Uint8Array(_);

                const y = decodeTsRecord(x);
                const parsedLog: IReqstoreLog = {};

                y.reduce( (log, tsRecord) => {
                    if (log[tsRecord.ts] === undefined) {
                        log[tsRecord.ts] = [];
                    }

                    tsRecord.entries.forEach( ({uid, data}) => {
                      const reqRes = asServingReqRes(data);
                      const request = reqRes.req;
                      const response = reqRes.resp;
                      parsedLog[tsRecord.ts].push({
                        uid,
                        request,
                        response,
                      });
                    });
                    return log;
                }, parsedLog);

                return parsedLog;
            })
        );
    }
}
