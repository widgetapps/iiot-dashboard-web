import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { StoreModule } from "@ngrx/store";
import * as fromAssets from "./store/assets-reducer";
import { EffectsModule } from "@ngrx/effects";
import { AssetsEffects } from "./store/assets-effects";
import { ClientsService } from "../../shared/services/api";
import { AssetsStoreFacade } from "./store/assets-store-facade";


@NgModule({
  declarations: [AssetsComponent],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    StoreModule.forFeature(fromAssets.featureKey, fromAssets.reducer),
    EffectsModule.forFeature([AssetsEffects])
  ],
  providers: [AssetsStoreFacade, ClientsService]
})
export class AssetsModule { }
