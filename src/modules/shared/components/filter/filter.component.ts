
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IModel, IApplication } from '@shared/models/_index';
import { Observable, Observer, Subscription } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'hydro-filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit, OnDestroy {
    filterControl = new FormControl('');
    filterControlSub: Subscription;

    @Input() data: Array<IModel | IApplication>;
    @Input() filterType: string = 'byStrValue';
    @Input() filterProp: string = 'name';
    @Input() debounce: number = 300;

    @Output() filterEvent = new EventEmitter<Array<IApplication | IModel>>();

    ngOnInit() {
        const observable: Observable<any> = this.filterControl.valueChanges.pipe(debounceTime(this.debounce));
        const observer: Observer<any> = this.getObserverByType(this.filterType);
        this.filterControlSub = observable.pipe().subscribe(observer);
    }

    ngOnDestroy() {
        this.filterControlSub.unsubscribe();
    }

    private getObserverByType(type: string): Observer<any> {
        switch (type) {
            case 'byStrValue':
                return {
                    next: filterStr => {
                        const filteredData = this.filterByStrValue(filterStr);
                        this.filterEvent.emit(filteredData);
                    },
                    complete: () => {},
                    error: e => console.error(e),
                };
            default:
                return {
                    next: () => this.filterEvent.emit(this.data),
                    complete: () => {},
                    error: e => console.error(e),
                };
        }
    }

    private filterByStrValue(searchStr: string): Array<IApplication | IModel> {
        const reg = new RegExp(searchStr, 'i');
        return this.data.filter(item => reg.test(item[this.filterProp]));
    }
}
