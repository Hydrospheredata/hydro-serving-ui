import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class EnvironmentsService {
    public getEnvironments() {
        return of([
            {
                id: 0,
                name: 'CPU',
                placeholders: [],
            },
            {
                id: 1,
                name: 'GPU',
                placeholders: [],
            },
        ]);
    }
}
