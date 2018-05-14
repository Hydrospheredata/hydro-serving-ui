import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@core/services/http/_index';



@Injectable()
export class EnvironmentsService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/environment`;
    }

    public getEnvironments() {
        return this.http.get(this.baseAPIUrl)
            .map((res: Response) => {
                return res.json();
            });
    }

    public deleteEnvironment(id: number) {
        return this.http.delete(`${this.baseAPIUrl}/${id}`);
    }
}
