import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class EnvironmentsService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/environment`;
    }

    public getEnvironments(): Observable<any> {
        return this.http.get(this.baseAPIUrl)
                .map((res: Response) => {
                    return res.json();
                })
    }

    public addEnvironment(environment): Observable<any> {
        return this.http.post(this.baseAPIUrl, environment)
                .map((res: Response) => {
                    return res.json();
                })
    }

    public deleteEnvironment(id: number) {
        return this.http.delete(`${this.baseAPIUrl}/${id}`);
    }


}