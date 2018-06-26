// import * as fromForm from './form.reducer';
// import * as fromRoot from '@core/reducers';
// import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// export interface FormState {
//     form: fromForm.State;
// }

// export interface State extends fromRoot.HydroServingState {
//     form: FormState
// }

// export const reducers: ActionReducerMap<FormState> = {
//     form: fromForm.reducer
// }

// export const getFormState = createFeatureSelector<FormState>('form');

// export const getFormEntitiesState = createSelector(
//     getFormState,
//     state => state && state.form
// );

// export const {
//     selectEntities: getFormEntities,
//     selectAll: getAllForms,
//     selectTotal: getTotalForms,
// } = fromForm.adapter.getSelectors(getFormEntitiesState);

// export const getForm = createSelector(
//     getFormEntities,
//     entities => entities[0]
// );
