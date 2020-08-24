import { Component, OnInit, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-match-expression',
  templateUrl: './match-expression.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
})
export class MatchExpressionComponent implements OnInit {
  @Input() group: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {}

  get values(): FormArray {
    return this.group.get('values') as FormArray;
  }

  addValue() {
    this.values.push(this.fb.control(''));
  }

  removeValue(index: number) {
    this.values.removeAt(index);
  }
}
