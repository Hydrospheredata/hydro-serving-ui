import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { ModelVersion } from '@shared/_index';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'hs-model-version-log',
  templateUrl: './model-version-log.component.html',
  styleUrls: ['./model-version-log.component.scss'],
})
export class ModelVersionLogComponent implements OnInit  {
  @Input() modelVersion: number;
  log$: Observable<string[]>;
  error: string;
  constructor(
    private logService: ModelVersionLogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.log$ = this.logService.getLog(this.modelVersion).pipe(
      catchError(() => {
        this.error = `No logs available`;
        this.cdr.detectChanges();
        return of([]);
      })
    );
  }
}
