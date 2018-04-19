import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';
import { Application } from '@shared/models/_index';



@Injectable()
export class ApplicationsService {

    private baseApiUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseApiUrl = `${environment.apiUrl}/applications`;
    }

    public getApplications(): Observable<Application[]> {
        return this.http.get(this.baseApiUrl)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public updateApplication(application: Application): Observable<Application> {
        return this.http.put(this.baseApiUrl, application)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public addApplication(application: Application) {
        return this.http.post(this.baseApiUrl, application)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public generateInputs(id: number, signatureName: string) {
        return this.http.get(`${this.baseApiUrl}/generateInputs/${id}/${signatureName}`)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public deleteApplication(id: number) {
        return this.http.delete(`${this.baseApiUrl}/${id}`);
    }

    public serveService(data, id, signatureName): Observable<any> {
        return this.http.post(`${this.baseApiUrl}/serve/${id}/${signatureName}`, data)
            .map((response: Response) => {
                return response.json();
            });
    }

}
