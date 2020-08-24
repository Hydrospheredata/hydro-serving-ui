import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
})
export class PodComponent implements OnInit {
  @Input() group: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {}

  get tolerations(): FormArray {
    return this.group.get(['tolerations']) as FormArray;
  }

  addToleration(): void {
    this.tolerations.push(
      this.fb.group({
        effect: this.fb.control(''),
        tolerationSeconds: this.fb.control(0),
        value: this.fb.control(''),
        key: this.fb.control(''),
        operator: this.fb.control(''),
      })
    );
  }
}
