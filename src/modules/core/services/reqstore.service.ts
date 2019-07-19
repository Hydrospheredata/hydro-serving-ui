import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import {
  decodeTsRecord,
  asServingReqRes,
} from '@shared/components/metrics/req';
import { ReqstoreLog } from '@shared/models/reqstore.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ReqstoreRequestParams {
  modelVersionId: string;
  from: string;
  till: string;
  maxBytes?: string;
  maxMessages?: string;
  reverse?: string;
}

@Injectable()
export class ReqstoreService {
  private baseReqstoreUrl: string;

  constructor(private http: HttpService) {
    this.baseReqstoreUrl = `${environment.reqstoreUrl}`;
  }

  public getData({
    modelVersionId,
    from,
    till,
    maxBytes,
    maxMessages,
    reverse,
  }: ReqstoreRequestParams): Observable<any> {
    const f = this.fromSecondsToMicroseconds(from);
    const t = this.fromSecondsToMicroseconds(till);
    const params: HttpParams = new HttpParams({
      fromObject: { maxBytes, maxMessages, reverse },
    });

    return this.http
      .get(`${this.baseReqstoreUrl}/${modelVersionId}/get?from=${f}&to=${t}`, {
        responseType: 'arraybuffer',
        params,
      })
      .pipe(
        map((_: any) => {
          const x = new Uint8Array(_);
          const tsRecords = decodeTsRecord(x);
          const parsedLog: ReqstoreLog = {};

          tsRecords.reduce((log, tsRecord) => {
            const { ts } = tsRecord;
            tsRecord.entries.forEach(({ uid, data }) => {
              if (log[uid] === undefined) {
                log[uid] = [];
              }
              const reqRes = asServingReqRes(data);
              const request = reqRes.req;
              const response = reqRes.resp;
              parsedLog[uid].push({
                ts,
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

  fromSecondsToMicroseconds(timestamp): number {
    try {
      const MICROSECONDS_LENGTH = 19;
      const ts = timestamp + '';

      return +ts * Math.pow(10, MICROSECONDS_LENGTH - ts.length);
    } catch (e) {
      throw Error('Cant convert timestamp to microseconds');
    }
  }
}
