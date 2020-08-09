import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import { AlertlistComponent } from './alertlist/alertlist.component';
import { AlertgroupsComponent } from './alertgroups/alertgroups.component';
import { StoreModule } from "@ngrx/store";

import { EffectsModule } from "@ngrx/effects";
import { AlertsEffects } from "./alertlist/store/alerts-effects";
import { AlertGroupsEffects } from "./alertgroups/store/alertgroups-effects";

import * as fromAlerts from './alertlist/store/alerts-reducer';
import * as fromAlertGroups from './alertgroups/store/alertgroups-reducer';
import { AlertsStoreFacade } from "./alertlist/store/alerts-store-facade";
import { AlertGroupsStoreFacade } from "./alertgroups/store/alertgroups-store-facade";
import { ClientsService } from "../../shared/services/api";

@NgModule({
  declarations: [AlertsComponent, AlertlistComponent, AlertgroupsComponent],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    StoreModule.forFeature(fromAlertGroups.featureKey, fromAlertGroups.reducer),
    StoreModule.forFeature(fromAlerts.featureKey, fromAlerts.reducer),
    EffectsModule.forFeature([AlertsEffects, AlertGroupsEffects])
  ],
  providers: [AlertsStoreFacade, AlertGroupsStoreFacade, ClientsService]
})
export class AlertsModule { }
