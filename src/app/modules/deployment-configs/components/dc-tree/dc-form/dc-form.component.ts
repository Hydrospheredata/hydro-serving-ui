import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { PreserveFormService } from './preserve-form.service';

@Component({
  selector: 'hs-dc-form',
  templateUrl: './dc-form.component.html',
  styleUrls: ['./dc-form.component.scss'],
})
export class DcFormComponent implements OnInit {
  form: string;
  formIsValid: boolean;
  warning: string = '';

  constructor(
    private readonly facade: DeploymentConfigsFacade,
    private router: Router,
    private formPreserver: PreserveFormService
  ) {}

  ngOnInit(): void {
    this.form = this.formPreserver.retrieveForm()
      ? this.formPreserver.retrieveForm()
      : this.formPreserver.defaultForm();
    this.onChange(this.form);
  }

  onChange(e: string) {
    try {
      this.formPreserver.validateForm(this.form);
      this.formIsValid = true;
      this.formPreserver.saveForm(this.form);
      this.warning = '';
    } catch (err) {
      this.formIsValid = false;
      this.warning = err;
    }
  }

  onSave() {
    let value = this.formPreserver.parseDC(this.form);
    this.facade.add(value);
    this.formPreserver.clearForm();
    this.router.navigate([`deployment_configs/${value.name}`]);
  }

  resetForm() {
    this.form = this.formPreserver.defaultForm();
    this.formPreserver.clearForm();
    this.formIsValid = false;
  }
}
