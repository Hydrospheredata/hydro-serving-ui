
import {debounceTime} from 'rxjs/operators';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Model, Application } from '@shared/models/_index';
import { FormControl } from '@angular/forms'
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
    selector: 'hydro-filter',
    templateUrl: './filter.component.html'
}) 
export class FilterComponent implements OnInit {
    filterControl = new FormControl('');
    filterControlSub: Subscription;

    @Input() data: Array<Model | Application>;
    @Input() filterType: string = 'byStrValue'
    @Input() filterProp: string = 'name';
    @Input() debounce: number = 300;

    @Output() filterEvent = new EventEmitter<Array<Application | Model>>();

    ngOnInit(){
        const observable: Observable<any> = this.filterControl.valueChanges.pipe(debounceTime(this.debounce));
        const observer: Observer<any> = this. getObserverByType(this.filterType);
        this.filterControlSub = observable.subscribe(observer);
    }

    private getObserverByType(type: string): Observer<any>{
        switch (type) {
            case 'byStrValue':
                return {
                    next: (filterStr) => { 
                        const filteredData = this.filterByStrValue(filterStr);
                        this.filterEvent.emit(filteredData);
                    },
                    complete: () => {},
                    error: (e) => console.error(e)
                }
            default:
                return {
                    next: () => this.filterEvent.emit(this.data),
                    complete: () => {},
                    error: (e) => console.error(e)
                }
        }
    }

    private filterByStrValue(searchStr: string): Array<Application | Model>{
        const reg = new RegExp(searchStr, 'i');
        return this.data.filter(item => reg.test(item[this.filterProp]));
    }
}