import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '@environments/environment';
import { Response } from '@angular/http';
import { ModelVersion } from '@shared/models/_index';
import { ModelVersionBuilder } from '@shared/builders/_index';
import { HttpService } from '@shared/services/http/_index';



@Injectable()
export class BuildModelService {
    private baseUIUrl;

    constructor(
        private http: HttpService,
        private modelVersionBuilder: ModelVersionBuilder,
    ) {
        this.baseUIUrl = `${environment.uiUrl}/model`;
    }

    public build(options): Observable<ModelVersion> {
        return this.http.post(`${this.baseUIUrl}/build`, options)
            .map((res: Response) => {
                return this.extractModelVersion(res);
            });
    }

    public testModel(params) {
        const url = `${this.baseUIUrl}/serve`;

        return this.http.post(url, params)
            .map((res: Response) => res.json());
    }

    public stopModel(id): Observable<any> {
        const url = `${this.baseUIUrl}/stopService/${id}`;
        return this.http.delete(url).map(() => {});
    }

    private extractModelVersion(res: Response): ModelVersion {
        const props = res.json();
        return this.modelVersionBuilder.build(props);
    }
}
