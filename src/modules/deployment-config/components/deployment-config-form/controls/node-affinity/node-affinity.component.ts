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
export class NodeAffinityComponent {
  @Input() group: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  get required(): AbstractControl {
    return this.group.get('requiredDuringSchedulingIgnoredDuringExecution');
  }

  get nodeSelectorTerms(): FormArray {
    return (
      this.required && (this.required.get('nodeSelectorTerms') as FormArray)
    );
  }

  get preferred(): FormArray {
    return this.group.get(
      'preferredDuringSchedulingIgnoredDuringExecution'
    ) as FormArray;
  }

  get defaultNodeSelectorTerm(): FormGroup {
    return this.fb.group({
      matchExpressions: this.fb.array([]),
      matchFields: this.fb.array([]),
    });
  }

  addNodeSelectorTerm(): void {
    this.nodeSelectorTerms.push(this.defaultNodeSelectorTerm);
  }

  addPreference(control: AbstractControl): void {
    (control.get('preference') as FormArray).push(this.defaultNodeSelectorTerm);
  }

  addRequired(): void {
    this.group.addControl(
      'requiredDuringSchedulingIgnoredDuringExecution',
      this.fb.group({
        nodeSelectorTerms: this.fb.array([this.defaultNodeSelectorTerm]),
      })
    );
  }

  addPreferredArray(): void {
    this.group.addControl(
      'preferredDuringSchedulingIgnoredDuringExecution',
      this.fb.array([this.getDefaultPreferred()])
    );
  }

  addPreferred(): void {
    this.preferred.push(this.getDefaultPreferred());
  }

  private getDefaultPreferred() {
    return this.fb.group({
      weight: this.fb.control(''),
      preference: this.fb.array([this.defaultNodeSelectorTerm]),
    });
  }
}
