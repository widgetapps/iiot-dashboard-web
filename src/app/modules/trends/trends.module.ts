import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendsRoutingModule } from './trends-routing.module';
import { TrendsComponent } from './trends.component';
import { ClientsService } from "../../shared/services/api";
import { StoreModule } from "@ngrx/store";
import * as fromTrends from "./store/trends-reducer";
import { EffectsModule } from "@ngrx/effects";
import { TrendsEffects } from "./store/trends-effects";


@NgModule({
  declarations: [TrendsComponent],
  imports: [
    CommonModule,
    TrendsRoutingModule,
    StoreModule.forFeature(fromTrends.featureKey, fromTrends.reducer),
    EffectsModule.forFeature([TrendsEffects])
  ],
  providers: [ ClientsService ]
})
export class TrendsModule { }
