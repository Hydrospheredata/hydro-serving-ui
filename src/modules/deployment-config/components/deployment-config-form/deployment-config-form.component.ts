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
    const fb = this.fb;

    this.form = fb.group({
      name: fb.control('', [Validators.required]),
      hpa: fb.group({
        maxReplicas: fb.control(0),
        minReplicas: fb.control(0),
        cpuUtilization: fb.control(0),
      }),
      deployment: fb.group({
        replicaCount: fb.control(0),
      }),
      container: fb.group({
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
      }),
      pod: fb.group({
        tolerations: fb.array([]),
        nodeSelector: fb.control(''),
        affinity: fb.group({
          nodeAffinity: fb.group({
            requiredDuringSchedulingIgnoredDuringExecution: fb.array([]),
            preferredDuringSchedulingIgnoredDuringExecution: fb.array([]),
          }),
          podAffinity: fb.group({
            requiredDuringSchedulingIgnoredDuringExecution: fb.array([]),
            preferredDuringSchedulingIgnoredDuringExecution: fb.array([]),
          }),
          podAntiAffinity: fb.group({
            requiredDuringSchedulingIgnoredDuringExecution: fb.array([]),
            preferredDuringSchedulingIgnoredDuringExecution: fb.array([]),
          }),
        }),
      }),
    });
  }
}
