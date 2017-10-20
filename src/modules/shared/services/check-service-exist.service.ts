import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Store } from '@ngrx/store';
import { AppState, Service } from '@shared/models/_index';



@Injectable()
export class CheckServiceExistService {
    private services: Service[] = [];


    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {}

    isExist(id: string) {
        this.store.select('services').first().subscribe(services => {
            this.services = services;
            if (this.services.length) {
                if (this.services.filter(service => service.id === +id).length) {
                    return true;
                } else {
                    this.router.navigate(['/services']);
                    return false;
                }
            } else {
                this.router.navigate(['/services']);
                return false;
            }
        });
        return true;
    }

}
