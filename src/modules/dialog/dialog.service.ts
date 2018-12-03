import {
    Injectable,
    Injector,
    ViewContainerRef,
    ComponentRef,
    Provider,
    ReflectiveInjector,
    ElementRef,
} from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { ComponentFactory } from '@angular/core';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface DialogOptions {
    component: any;
    providers?: Provider[];
    classes?: string;
    styles?: {[key: string]: string};
}

@Injectable()
export class DialogService {

    get show$(): Observable<boolean> {
        return this.show.asObservable();
    }
    public show: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public containerElementRef: ElementRef<any>;
    public viewContainerRef: ViewContainerRef;

    private renderer: Renderer2;

    constructor(
        private cfr: ComponentFactoryResolver,
        private parentInjector: Injector,
        private rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);

    }

    public createDialog(options: DialogOptions): void {
        const {
            component,
            providers,
            styles,
        } = options;

        const cf: ComponentFactory<any> = this.cfr.resolveComponentFactory(component);
        let childInjector: ReflectiveInjector;
        let c: ComponentRef<any>;

        if (providers) {
            childInjector = ReflectiveInjector.resolveAndCreate(providers, this.parentInjector);
            c = cf.create(childInjector);
        } else {
            c = cf.create(this.parentInjector);
        }

        this.viewContainerRef.insert(c.hostView);
        this.setStyles(styles);
        this.openDialog();
    }

    public openDialog(): void {
        this.show.next(true);
    }

    public closeDialog(): void {
        this.show.next(false);
    }

    public clearContainer(): void {
        this.renderer.removeAttribute(this.containerElementRef.nativeElement, 'style');
        this.viewContainerRef.clear();
    }

    public setViewContainerRef(value: ViewContainerRef): void {
        this.viewContainerRef = value;
    }

    public setContainerElementRef(elRef: ElementRef): void {
        this.containerElementRef = elRef;
    }

    private setStyles(styles = {}): void {
        for (const key in styles) {
            if (styles.hasOwnProperty(key)) {
                this.renderer.setStyle(this.containerElementRef.nativeElement, key, styles[key]);
            }
        }
    }
}
