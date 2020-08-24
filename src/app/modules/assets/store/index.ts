import * as fromAssets from './assets-reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export interface AssetsState {
  assets: fromAssets.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: AssetsState | undefined, action: Action) {
  return combineReducers({
    assets: fromAssets.reducer
  })(state, action)
}

export const getAssetsState = createFeatureSelector<fromAssets.State>('assets');

export const selectAssetIds = createSelector(
  getAssetsState,
  fromAssets.selectAssetIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);
export const selectAssetEntities = createSelector(
  getAssetsState,
  fromAssets.selectAssetEntities
);
export const selectAllAssets = createSelector(
  getAssetsState,
  fromAssets.selectAllAssets
);
export const selectAssetTotal = createSelector(
  getAssetsState,
  fromAssets.selectAssetTotal
);
