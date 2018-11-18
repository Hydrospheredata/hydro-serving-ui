import { Action } from '@ngrx/store';

export enum DialogActionTypes {
    OpenDialog = '[Dialog] Open dialog',
    CloseDialog = '[Dialog] Close dialog',
}

export class OpenDialog implements Action {
    readonly type = DialogActionTypes.OpenDialog;

    constructor(public dialogType: string) { }
}

export class CloseDialog implements Action {
    readonly type = DialogActionTypes.CloseDialog;

    constructor(public dialogType: string) { }
}

export type DialogActions
    = OpenDialog
    | CloseDialog;
