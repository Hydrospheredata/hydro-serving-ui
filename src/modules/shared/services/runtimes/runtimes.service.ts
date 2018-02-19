import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';



@Injectable()
export class RuntimesService {
    
    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/runtime`;
    }

    public getRuntimes() {
        return this.http.get(`${this.baseAPIUrl}`)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public createRuntime(options) {
        return this.http.post(this.baseAPIUrl, options)
            .map((res: Response): any => {
                return res.json();
            });
    }

    // public getModelType(modelType: Model) {
    //     return this.http.post(this.baseAPIUrl, model);
    // }

}
