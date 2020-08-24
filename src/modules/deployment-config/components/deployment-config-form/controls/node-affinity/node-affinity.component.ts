import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  AbstractControl,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-node-affinity',
  templateUrl: './node-affinity.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeAffinityComponent implements OnInit {
  @Input() group: AbstractControl;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {}

  get required(): AbstractControl {
    return this.group.get('requiredDuringSchedulingIgnoredDuringExecution');
  }

  get nodeSelectorTerms(): FormArray {
    return this.required.get('nodeSelectorTerms') as FormArray;
  }

  get preferred(): FormArray {
    return this.group.get(
      'preferredDuringSchedulingIgnoredDuringExecution'
    ) as FormArray;
  }

  addNodeSelectorTerm(): void {
    this.nodeSelectorTerms.push(this.defaultNodeSelectorTerm);
  }

  addPreference(control: AbstractControl): void {
    (control.get('preference') as FormArray).push(this.defaultNodeSelectorTerm);
  }

  get defaultNodeSelectorTerm(): FormGroup {
    return this.fb.group({
      matchExpressions: this.fb.array([]),
      matchFields: this.fb.array([]),
    });
  }

  addPreferred() {
    this.preferred.push(
      this.fb.group({
        weight: this.fb.control(''),
        preference: this.fb.array([this.defaultNodeSelectorTerm]),
      })
    );
  }
}
