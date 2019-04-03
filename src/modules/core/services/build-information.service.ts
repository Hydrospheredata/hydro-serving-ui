import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';

@Injectable()
export class BuildInformationService {
    private buildInfoApi = '/api/buildinfo';
    private gatewayInfoApi = '/gateway/buildinfo';

    constructor(
       private http: HttpService
    ) {}

    getBuildInformation(): Observable<any> {
        return combineLatest(
            this.http.get(this.buildInfoApi),
            this.http.get(this.gatewayInfoApi)
        );
    }
}
