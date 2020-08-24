import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-affinity-preferred',
  templateUrl: './affinity-preferred.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AffinityPreferredComponent implements OnInit {
  @Input() group: AbstractControl;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {}

  private get namespaceControl(): FormControl {
    return this.fb.control('');
  }

  addNamespace(control: AbstractControl): void {
    (control.get('namespaces') as FormArray).push(this.namespaceControl);
  }

  addMatchExpression(requireControl: AbstractControl): void {
    this.getMatchExprs(requireControl).push(this.defaultMatchExpression);
  }

  get namespaces(): FormArray {
    return this.group.get('podAffinityTerm').get('namespaces') as FormArray;
  }

  private get defaultMatchExpression(): FormGroup {
    return this.fb.group({
      values: this.fb.array([]),
      key: this.fb.control(''),
      operator: this.fb.control(''),
    });
  }

  getMatchExprs(control: AbstractControl): FormArray {
    return control
      .get('podAffinityTerm')
      .get('labelSelector')
      .get('matchExpressions') as FormArray;
  }
}
