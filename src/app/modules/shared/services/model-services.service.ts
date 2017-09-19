import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModelServicesService {
    baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/modelService`;
    }

    getModelServices() {
        return this.http.get(this.baseAPIUrl)
                    .map((res: Response): any => {
                      // console.log(res);
                      return res.json();
                    });
    }

    getModelService(id: number): Observable<any> {
        const url = `${this.baseAPIUrl}/${id}`;
        return this.http.get(url)
                    .map((res: Response): any => {
                      return res.json();
                    });
    }
    createModelService() {}
    removeModelService() {}
    updateModelService() {}
    serveModelService() {}

}
