import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';



@Injectable()
export class SourcesService {
    
    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/modelSource`;
    }

    public getSources() {
        return this.http.get(`${this.baseAPIUrl}`)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public addSource(options) {
        return this.http.post(`${this.baseAPIUrl}/${options.type}`, options.body)
            .map((res: Response): any => {
                return res.json();
            });
    }

}
