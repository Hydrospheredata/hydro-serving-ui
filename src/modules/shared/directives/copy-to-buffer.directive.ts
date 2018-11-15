import { Directive, ElementRef, Input, OnDestroy } from "@angular/core";
import { fromEvent ,  Subscription, BehaviorSubject } from "rxjs";
import { tap, filter, delay } from "rxjs/operators"




@Directive({
    selector: '[copyToBuffer]'
})
export class CopyToBufferDirective implements OnDestroy {
    @Input('copyToBuffer') copiedText: string;
    private clickSubscriprtion$: Subscription;
    private toogleDelay = 3000;
    private copy$ = new BehaviorSubject<boolean>(false);

    constructor(public el: ElementRef) {
        this.copy$.subscribe(copy => this.setHostElementText(copy));
        this.clickSubscriprtion$ = this.createClickSubscription();
    }

    ngOnDestroy(){
        this.clickSubscriprtion$.unsubscribe();
        this.copy$.complete();
    }

    private createClickSubscription(): Subscription {
       return fromEvent(this.el.nativeElement, 'click').pipe(
            filter(_ => {return this.copy$.getValue() === false}),
            tap(_ => { this.copy$.next(true) }),
            delay(this.toogleDelay),
            tap(_ => { this.copy$.next(false) })
        ).subscribe()
    }

    private copyToClipboard(text: string) : void {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    private setHostElementText(copy: boolean): void {
        if(copy){
            this.copyToClipboard(this.copiedText);
            this.el.nativeElement.innerText = "copied";
        } else {
            this.el.nativeElement.innerText = "copy"; 
        }
    }
}