import { Action } from '@ngrx/store';
import { Form } from '@shared/models/form.model';

export enum FormActionTypes {
    CreateForm = '[Form] Create form',
    AddStage = '[Form] Add stage to form',
    RemoveStage = '[Form] Remove stage from form',
    AddModelVersion = '[Form] Add model version to stage',
    RemoveModelVersion = '[Form] Remove model version from stage'
};

export class CreateForm implements Action {
    readonly type = FormActionTypes.CreateForm;
    constructor(public form: Form) { }
}

export class AddStage implements Action {
    readonly type = FormActionTypes.AddStage;
    constructor(public stage) { }
}

export class RemoveStage implements Action {
    readonly type = FormActionTypes.RemoveStage;
    constructor(public stage) { }
}

export class AddModelVersion implements Action {
    readonly type = FormActionTypes.AddModelVersion;
}

export class RemoveModelVersion implements Action {
    readonly type = FormActionTypes.RemoveModelVersion;
}

export type FormActions
    = CreateForm
    | AddStage
    | RemoveStage
    | AddModelVersion
    | RemoveModelVersion;
