import { AssetModel } from '../../../shared/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  getAllSuccess
} from './assets-actions';

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const assetsAdapter = createEntityAdapter<AssetModel>({
  selectId: (asset: AssetModel) => asset._id,
  sortComparer: false
});

export interface State extends EntityState<AssetModel> {
  // additional props here
}

export const INIT_STATE: State = assetsAdapter.getInitialState({
  // additional props default values here
});

export const featureKey = 'assets';

export const reducer = createReducer<State>(
  INIT_STATE,
  on(getAllSuccess, (state, {assets}) =>
    assetsAdapter.setAll(assets, state)
  )
);

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = assetsAdapter.getSelectors();

// select the array of ids
export const selectAssetIds = selectIds;

// select the dictionary of entities
export const selectAssetEntities = selectEntities;

// select the array
export const selectAllAssets = selectAll;

// select the total count
export const selectAssetTotal = selectTotal;
