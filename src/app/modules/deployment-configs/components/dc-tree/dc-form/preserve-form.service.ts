import { Injectable } from '@angular/core';

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

  clearForm(): void {
    localStorage.clear();
  }
}
