import { Injectable } from '@angular/core';
import { load as loadYaml } from 'js-yaml';
import { DeploymentConfig } from '@app/core/data/types';

@Injectable({
  providedIn: 'root',
})
export class PreserveFormService {
  constructor() {}

  saveForm(form): void {
    localStorage.setItem('formValue', JSON.stringify(form));
  }

  retrieveForm() {
    if (localStorage.getItem('formValue') !== null) {
      return JSON.parse(localStorage.getItem('formValue'));
    } else {
      return null;
    }
  }

  validateForm(form: string): void {
    let value = loadYaml(form) as DeploymentConfig;
    if (!value.name) {
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
    return `name: ''`;
  }
}
