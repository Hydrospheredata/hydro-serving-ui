import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-affinity',
  templateUrl: './affinity.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
})
export class AffinityComponent {
  @Input() group: FormGroup;

  constructor(private fb: FormBuilder) {}

  get nodeAffinity(): FormGroup {
    return this.group.get('nodeAffinity') as FormGroup;
  }

  get podAffinity(): FormGroup {
    return this.group.get('podAffinity') as FormGroup;
  }

  get podAntiAffinity(): FormGroup {
    return this.group.get('podAntiAffinity') as FormGroup;
  }

  addNodeAffinity(): void {
    this.group.addControl('nodeAffinity', this.fb.group({}));
  }

  addPodAffinity(): void {
    this.group.addControl(
      'podAffinity',
      this.fb.group({
        requiredDuringSchedulingIgnoredDuringExecution: this.fb.array([]),
        preferredDuringSchedulingIgnoredDuringExecution: this.fb.array([]),
      })
    );
  }

  addPodAntiAffinity(): void {
    this.group.addControl(
      'podAntiAffinity',
      this.fb.group({
        requiredDuringSchedulingIgnoredDuringExecution: this.fb.array([]),
        preferredDuringSchedulingIgnoredDuringExecution: this.fb.array([]),
      })
    );
  }
}
