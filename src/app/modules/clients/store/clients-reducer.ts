import { ClientModel } from '../../../shared/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  clearClients, getAllClientsSuccess, setSelectedClient
} from './clients-actions';
import {authSuccess} from "../../../core/auth/login/store/actions";
import * as authHelper from '../../../shared/helpers/auth.helper';

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const clientsAdapter = createEntityAdapter<ClientModel>({
  selectId: (client: ClientModel) => client._id,
  sortComparer: false
});

export interface State extends EntityState<ClientModel> {
  // additional props here
  selected: string;
}

export const INIT_STATE: State = clientsAdapter.getInitialState({
  // additional props default values here
  selected: null
});

export const featureKey = 'clients';

export const reducer = createReducer<State>(
  INIT_STATE,
  on(getAllClientsSuccess, (state, {clients}) => clientsAdapter.setAll(clients, state)),
  on(authSuccess, (state, {response}) => ({...state, selected: authHelper.getUser().client})),
  on(setSelectedClient, (state, {client}) => ({...state, selected: client})),
  on(clearClients, state => { return clientsAdapter.removeAll({...state, selected: null}) })
);

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = clientsAdapter.getSelectors();

// select the array of device ids
export const selectClientIds = selectIds;

// select the dictionary of device entities
export const selectClientEntities = selectEntities;

// select the array of devices
export const selectAllClients = selectAll;

// select the total device count
export const selectClientTotal = selectTotal;

export const getSelected = (state: State) => state.selected;
