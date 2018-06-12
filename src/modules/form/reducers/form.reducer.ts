// import { FormActionTypes, FormActions } from "@form/actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Form } from "@shared/models/form.model";

export interface State extends EntityState<Form> { };

export const adapter: EntityAdapter<Form> = createEntityAdapter<Form>();

export const initialState = adapter.getInitialState();

// export function reducer(state = initialState, action: FormActions): State {
//     switch (action.type) {
//         case FormActionTypes.CreateForm: {
//             return adapter.addOne(action.form, state);
//         }

//         case FormActionTypes.AddStage: {
//             return adapter.addOne(action.stage, state);
//         }

//         case FormActionTypes.RemoveStage: {
//             return adapter.removeOne(action.stage, state);
//         }

//         default: {
//             return state;
//         }
//     }
// }