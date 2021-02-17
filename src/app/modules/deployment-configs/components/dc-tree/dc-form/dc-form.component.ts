import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'hs-dc-form',
  templateUrl: './dc-form.component.html',
  styleUrls: ['./dc-form.component.scss']
})
export class DcFormComponent implements OnInit {
  formEmitter: Subscription;

  configTemplate = {
    name: ['', [
      Validators.required
    ]],
    hpa: {
      maxReplicas: null,
      cpuUtilization: null,
      minReplicas: null,
    },
    deployment: {replicaCount: null},
    container: {
      resources: {
        requests: { memory: '', cpu: '' },
        limits: { memory: '', cpu: '' },
      },
      env: []
    },
    pod: {
      tolerations: [],
      nodeSelector: {key: '', value: ''}
    }
  }
  form: FormGroup;

  constructor(
    private readonly facade: DeploymentConfigsFacade,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let config;

    if(localStorage.getItem("formValue") !== null) {
      config = JSON.parse(localStorage.getItem("formValue"));
    } else {
      config = this.configTemplate;
    }

    let hpa = this.fb.group(config.hpa);
    let deployment = this.fb.group(config.deployment);
    let resources = this.fb.group({
      requests: this.fb.group(config.container.resources.requests),
      limits: this.fb.group(config.container.resources.limits)
    });
    let env = this.fb.array(config.container.env.map(el => this.fb.group(el)));
    let container = this.fb.group({resources, env});
    let pod = this.fb.group({
      tolerations: this.fb.array(config.pod.tolerations.map(el => this.fb.group(el))),
      nodeSelector: this.fb.group(config.pod.nodeSelector)
    })

    this.form = this.fb.group({...config, hpa, deployment, container, pod});

    this.formEmitter = this.form.valueChanges.pipe(tap((formValue) => {
      localStorage.setItem("formValue", JSON.stringify(formValue));
    }
    )).subscribe();
  }

  ngOnDestroy() {
    this.formEmitter.unsubscribe();
  }

  onSave() {
    let fv = this.form.value;
    this.facade.update({
      ...fv,
      name: fv.name,
      container: {
        ...fv.container,
        env: fv.container.env.reduce((acc, cur) => {
          acc[cur.key] = cur.value;
          return acc;
        }, {})
      },
      pod: {
        ...fv.pod,
        nodeSelector: {[fv.pod.nodeSelector.key]: fv.pod.nodeSelector.value}
      }
    });
    localStorage.clear();
    this.router.navigate([`deployment_configs/${fv.name}`]);
  }

  // container -> env controllers
  get envsForm() {
    return this.form.get('container').get('env') as FormArray;
  }
  addEnv() {
    let env = this.fb.group({
      key: '',
      value: ''
    });
    this.envsForm.push(env);
  }
  deleteEnv(i: number) {
    this.envsForm.removeAt(i);
  }

  // pod -> tolerations controllers
  get tolerationsForm() {
    return this.form.get('pod').get('tolerations') as FormArray;
  }
  addToleration() {
    let toleration = this.fb.group({
        effect: '',
        tolerationSeconds: '',
        value: '',
        key: '',
        operator: '',
      });
    this.tolerationsForm.push(toleration);
  }
  deleteToleration(i: number) {
    this.tolerationsForm.removeAt(i);
  }

}
