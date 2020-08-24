import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-affinity-required',
  templateUrl: './affinity-required.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AffinityRequiredComponent implements OnInit {
  @Input() group: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {}

  addMatchExpression(requireControl: AbstractControl): void {
    this.getMatchExprs(requireControl).push(this.defaultMatchExpression);
  }

  private get defaultMatchExpression(): FormGroup {
    return this.fb.group({
      values: this.fb.array([]),
      key: this.fb.control(''),
      operator: this.fb.control(''),
    });
  }

  private get namespaceControl(): FormControl {
    return this.fb.control('');
  }

  get namespaces(): FormArray {
    return this.group.get('namespaces') as FormArray;
  }

  getMatchExprs(requireControl: AbstractControl): FormArray {
    return requireControl
      .get('labelSelector')
      .get('matchExpressions') as FormArray;
  }
  addNamespace(control: AbstractControl): void {
    (control.get('namespaces') as FormArray).push(this.namespaceControl);
  }
}
