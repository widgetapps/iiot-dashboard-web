import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import { AlertlistComponent } from './alertlist/alertlist.component';
import { AlertgroupsComponent } from './alertgroups/alertgroups.component';


@NgModule({
  declarations: [AlertsComponent, AlertlistComponent, AlertgroupsComponent],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class AlertsModule { }
