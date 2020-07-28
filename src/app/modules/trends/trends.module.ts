import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendsRoutingModule } from './trends-routing.module';
import { TrendsComponent } from './trends.component';
import { ClientsService } from "../../shared/services/api";
import { StoreModule } from "@ngrx/store";
import * as fromTrends from "./store/trends-reducer";
import { EffectsModule } from "@ngrx/effects";
import { TrendsEffects } from "./store/trends-effects";
import { ChartsModule } from 'ng2-charts';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { TrendsFilterPipe } from "./trends.filter.pipe";
import {TrendsStoreFacade} from "./store/trends-store-facade";


@NgModule({
  declarations: [
    TrendsComponent,
    TrendsFilterPipe
  ],
  imports: [
    CommonModule,
    TrendsRoutingModule,
    StoreModule.forFeature(fromTrends.featureKey, fromTrends.reducer),
    EffectsModule.forFeature([TrendsEffects]),
    ChartsModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule
  ],
  providers: [ TrendsStoreFacade, ClientsService ]
})
export class TrendsModule { }
