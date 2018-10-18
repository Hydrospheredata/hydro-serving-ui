import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdlSnackbarService, MdlDialogReference } from '@angular-mdl/core';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { TestStatus, Application } from '@shared/models/_index';
import { DialogBase } from '@shared/base/_index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';
import * as fromApplications from '@applications/reducers';
import { GenerateInputAction, TestApplicationAction, SetInputAction } from '@applications/actions';
import { environment } from '@environments/environment.prod';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs';




@Component({
    selector: 'hydro-dialog-test-model',
    templateUrl: './dialog-test.component.html',
    styleUrls: ['./dialog-test.component.scss'],
    providers: [MdlSnackbarService]
})
export class DialogTestComponent extends DialogBase implements OnInit, OnDestroy {
    public application$: Observable<Application>;
    public applicationName$: Observable<string>;
    public applicationId$: Observable<number>;
    public curl: string;
    public grpc:string = '';
    public input: any = '';
    public input$: Observable<string>;
    public inputOptions: {};
    public isValidInput$: Observable<boolean>;
    public output: any = '';
    public output$: Observable<string>;
    public outputOptions: {};
    public requestBody: string;
    public testStatus$: Observable<TestStatus>;

    private applicationSubscription: Subscription;

    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
        this.applicationName$ = this.store.select(fromApplications.getSelectedApplicationName);
        this.applicationId$ = this.store.select(fromApplications.getSelectedApplicationId);
        this.input$ = this.store.select(fromApplications.getSelectedApplicationInput);
        this.output$ = this.store.select(fromApplications.getSelectedApplicationOutput);
        this.testStatus$ = this.store.select(fromApplications.getSelectedApplicationTestStatus);

        
        this.applicationSubscription = this.application$.subscribe(
            (application: Application) => { 
                this.updateCurl(application)
                this.updateGrpc();
            })

        this.isValidInput$ = this.input$.switchMap(input => {
            try {
                JSON.parse(input);
                return of(true)
            } catch(e) {
                return of(false)
            }
        })
    }

    public close(){
        this.dialogRef.hide();
    }

    private updateCurl(application: Application): void {
        const { host , port, apiUrl } = environment;
        const headers = `--header 'Content-Type: application/json' --header 'Accept: application/json'`
        const { input, id, name } = application;
        const url = `${host}:${port}${apiUrl}/applications/serve/${id}/${name}`;
        this.curl = `curl -X POST ${headers} -d '${input}' '${url}'`;
    }

    private updateGrpc(): void {
        this.grpc = `import grpc \n
            import hydro_serving_grpc as hs \n
            channel = grpc.insecure_channel("localhost:8080") \n
            stub = hs.PredictionServiceStub(channel) \n
            model_spec = hs.ModelSpec(name="linear_regression", signature_name="infer") \n
            tensor_shape = hs.TensorShapeProto(dim=[hs.TensorShapeProto.Dim(size=-1), hs.TensorShapeProto.Dim(size=2)]) \n
            tensor = hs.TensorProto(dtype=hs.DT_DOUBLE, tensor_shape=tensor_shape, double_val=[1,1,1,1]) \n
            result = stub.Predict(request) \n`;
    }

    ngOnInit() {
        this.inputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: false,
            scrollbarStyle: 'null',
            onChange: (val) => {
                console.log(val);
            }
        };
        this.outputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: true,
            scrollbarStyle: 'null'
        };

        this.generateInput();
    }

    ngOnDestroy(){
        this.applicationSubscription.unsubscribe();
    }

    public onSubmit() {
        this.application$.take(1).subscribe(
            application => this.store.dispatch(new TestApplicationAction(application))
        )
    }

    public onChange(input) {
        if (!(input instanceof Event)) {
            this.store.dispatch(new SetInputAction(input));
        }
    }

    private generateInput() {
        this.store.dispatch(new GenerateInputAction);
    }
}
