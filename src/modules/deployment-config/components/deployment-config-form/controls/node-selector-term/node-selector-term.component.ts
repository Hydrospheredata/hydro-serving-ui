import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-node-selector-term',
  templateUrl: './node-selector-term.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
})
export class NodeSelectorTermComponent implements OnInit {
  @Input() group: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {}

  get matchExpressions(): FormArray {
    return this.group.get('matchExpressions') as FormArray;
  }

  get matchFields(): FormArray {
    return this.group.get('matchFields') as FormArray;
  }

  addMatchExpr(): void {
    this.matchExpressions.push(this.defaultMatchExpression);
  }

  addMatchField(): void {
    this.matchFields.push(this.defaultMatchField);
  }

  get defaultMatchExpression(): FormGroup {
    return this.fb.group({
      values: this.fb.array([]),
      key: this.fb.control(''),
      operator: this.fb.control(''),
    });
  }

  get defaultMatchField(): FormGroup {
    return this.fb.group({
      values: this.fb.array([]),
      key: this.fb.control(''),
      operator: this.fb.control(''),
    });
  }
}
