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
import { AlertgroupsFormComponent } from './alertgroups-form/alertgroups-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AlertgroupsNewComponent } from './alertgroups-new/alertgroups-new.component';
import { AlertgroupsEditComponent } from './alertgroups-edit/alertgroups-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {FlexModule} from "@angular/flex-layout";
import { AlertFormComponent } from './alert-form/alert-form.component';
import { AlertEditComponent } from './alert-edit/alert-edit.component';
import { AlertNewComponent } from './alert-new/alert-new.component';
import {ChipAutocompleteComponent} from "../../shared/components/chip-autocomplete/chip-autocomplete.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AlertsComponent,
    AlertlistComponent,
    AlertgroupsComponent,
    AlertgroupsFormComponent,
    AlertgroupsNewComponent,
    AlertgroupsEditComponent,
    AlertFormComponent,
    AlertEditComponent,
    AlertNewComponent,
    ChipAutocompleteComponent,
    ChipAutocompleteComponent
  ],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    StoreModule.forFeature(fromAlertGroups.featureKey, fromAlertGroups.reducer),
    StoreModule.forFeature(fromAlerts.featureKey, fromAlerts.reducer),
    EffectsModule.forFeature([AlertsEffects, AlertGroupsEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    FlexModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  providers: [AlertsStoreFacade, AlertGroupsStoreFacade, ClientsService]
})
export class AlertsModule { }
