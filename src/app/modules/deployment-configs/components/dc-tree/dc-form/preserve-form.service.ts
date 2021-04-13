import { Injectable } from '@angular/core';
import { load as loadYaml }  from 'js-yaml' ;
import { DeploymentConfig } from '@app/core/data/types';

@Injectable({
  providedIn: 'root'
})
export class PreserveFormService {

  constructor() { }

  saveForm(form): void {
    localStorage.setItem("formValue", JSON.stringify(form));
  }

  retrieveForm() {
    if(localStorage.getItem("formValue") !== null) {
      return JSON.parse(localStorage.getItem("formValue"));
    } else {
      return null;
    }
  }

  validateForm(form: string): void {
    let value = loadYaml(form) as DeploymentConfig;
    if(!value.name) {
      throw new Error('Valid name is required!');
    }
  }

  parseDC(form: string): DeploymentConfig {
    return loadYaml(form) as DeploymentConfig;
  }

  clearForm(): void {
    localStorage.clear();
  }

  defaultForm(): string {
    return `name: ''
hpa:
  maxReplicas:
  cpuUtilization:
  minReplicas:
deployment:
  replicaCount:
container:
  resources:
    requests:
      memory: ''
      cpu: ''
    limits:
      memory: ''
      cpu: ''
  env: {}
pod:
  tolerations: []
  nodeSelector: {}
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - nodeSelectorTerms:
          matchExpressions: []
          matchFields: []
      preferredDuringSchedulingIgnoredDuringExecution:
      - preference:
          matchExpressions: []
          matchFields: []
        weight:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions: []
        topologyKey: ''
        namespaces: []
      preferredDuringSchedulingIgnoredDuringExecution:
      - podAffinityTerm:
          labelSelector:
            matchLabels: {}
            matchExpressions: []
          topologyKey: ''
          namespaces: []
        weight:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions: []
        topologyKey: ''
        namespaces: []
      preferredDuringSchedulingIgnoredDuringExecution:
      - podAffinityTerm:
          labelSelector:
            matchLabels: {}
            matchExpressions: []
          topologyKey: ''
          namespaces: []
        weight:
`
  }
}
