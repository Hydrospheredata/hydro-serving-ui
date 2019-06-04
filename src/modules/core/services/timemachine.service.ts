import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

// {
//     "modelVersionFrom": string,  // source modelVersionId
//     "modelNameTo": string,  // ModelSpec name field to serve with
//     "versionTo": Long,      // ModelSpec version field to serve with
//     "from": Long,
//     "till":Long
// }
interface TimemachineTravelRequest {
    modelVersionFrom: string;
    modelNameTo: string;
    versionTo: string;
    from: string;
    till: string;
}
interface TimemachineTravelResponse {
    'id': string;
    'modelVersionFrom': string;
    'modelNameTo': string;
    'versionTo': number;
    'from': number;
    'till': number;
    'step': number;
    'sizeGuard': number;
}

@Injectable({
    providedIn: 'root',
})
export class TimemachineService {
    private baseUrl: string = environment.timemachineUrl;

    constructor(
       private http: HttpService
    ) {

    }

    travel(
        params: TimemachineTravelRequest
    ): Observable<TimemachineTravelResponse> {
        const url = `${this.baseUrl}/travel`;
        return this.http.post(url, params) as Observable<TimemachineTravelResponse>;
    }
}
