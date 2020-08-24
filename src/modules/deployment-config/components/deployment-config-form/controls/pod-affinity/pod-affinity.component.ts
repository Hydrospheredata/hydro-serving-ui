import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-pod-affinity',
  templateUrl: './pod-affinity.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodAffinityComponent {
  @Input() group: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  get required(): FormArray {
    return this.group.get(
      'requiredDuringSchedulingIgnoredDuringExecution'
    ) as FormArray;
  }

  get preferred(): FormArray {
    return this.group.get(
      'preferredDuringSchedulingIgnoredDuringExecution'
    ) as FormArray;
  }

  addRequired(): void {
    this.required.push(
      this.fb.group({
        labelSelector: this.fb.group({
          matchExpressions: this.fb.array([]),
        }),
        namespaces: this.fb.array([]),
        topologyKey: this.fb.control(''),
      })
    );
  }

  addPreferred(): void {
    this.preferred.push(
      this.fb.group({
        weight: this.fb.control(''),
        podAffinityTerm: this.fb.group({
          labelSelector: this.fb.group({
            matchLabels: this.fb.control(''),
            matchExpressions: this.fb.array([]),
          }),
          topologyKey: this.fb.control(''),
          namespaces: this.fb.array([]),
        }),
      })
    );
  }
}
