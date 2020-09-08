import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-deployment-config-form',
  templateUrl: './deployment-config-form.component.html',
  styleUrls: [
    './deployment-config-form.component.scss',
    '../../styles/deployment-config.scss',
  ],
})
export class DeploymentConfigFormComponent implements OnInit {
  form: FormGroup;

  constructor(readonly fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
    });
  }

  get pod(): FormGroup {
    return this.form.get('pod') as FormGroup;
  }

  get deployment(): FormGroup {
    return this.form.get('deployment') as FormGroup;
  }

  get hpa(): FormGroup {
    return this.form.get('hpa') as FormGroup;
  }

  get container(): FormGroup {
    return this.form.get('container') as FormGroup;
  }

  addHpa(): void {
    this.form.addControl(
      'hpa',
      this.fb.group({
        maxReplicas: this.fb.control(''),
        minReplicas: this.fb.control(''),
        cpuUtilization: this.fb.control(''),
      })
    );
  }

  addDeployment(): void {
    this.form.addControl(
      'deployment',
      this.fb.group({
        replicaCount: this.fb.control(''),
      })
    );
  }

  addContainer(): void {
    const fb = this.fb;

    this.form.addControl(
      'container',
      fb.group({
        resources: fb.group({
          limits: fb.group({
            cpu: fb.control(''),
            memory: fb.control(''),
          }),
          requests: fb.group({
            cpu: fb.control(''),
            memory: fb.control(''),
          }),
        }),
      })
    );
  }

  addPod(): void {
    this.form.addControl('pod', this.fb.group({}));
  }

  removeHpa(): void {
    this.form.removeControl('hpa');
  }

  removeDeployment(): void {
    this.form.removeControl('deployment');
  }

  removeContainer(): void {
    this.form.removeControl('container');
  }

  removePod(): void {
    this.form.removeControl('pod');
  }
}
