import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
})
export class PodComponent {
  @Input() group: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  get nodeSelector(): FormControl {
    return this.group.get('nodeSelector') as FormControl;
  }

  get tolerations(): FormArray {
    return this.group.get(['tolerations']) as FormArray;
  }

  get affinity(): FormGroup {
    return this.group.get('affinity') as FormGroup;
  }

  addToleration(): void {
    this.tolerations.push(this.toleration);
  }

  addTolerationArray(): void {
    this.group.addControl('tolerations', this.fb.array([this.toleration]));
  }

  addAffinity(): void {
    return this.group.addControl('affinity', this.fb.group({}));
  }

  addNodeSelector(): void {
    this.group.addControl('nodeSelector', this.fb.control(''));
  }

  private get toleration(): FormGroup {
    return this.fb.group({
      effect: this.fb.control(''),
      tolerationSeconds: this.fb.control(0),
      value: this.fb.control(''),
      key: this.fb.control(''),
      operator: this.fb.control(''),
    });
  }
}
