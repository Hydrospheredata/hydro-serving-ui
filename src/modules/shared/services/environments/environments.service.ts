import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class EnvironmentsService {

    baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/servingEnvironment`;
    }

    public getEnvironments(): Observable<any> {
        console.log("121313");
        return this.http.get(this.baseAPIUrl)
                .map((res: Response) => {
                    console.log(res);
                    return res.json();
                })
    }


}