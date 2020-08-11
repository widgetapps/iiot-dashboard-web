import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsComponent } from './alerts.component';
import { AuthGuard } from "../../core/guards/auth.guard";
import { AlertgroupsNewComponent } from "./alertgroups-new/alertgroups-new.component";

const routes: Routes = [
  { path: '', component: AlertsComponent, canActivate: [AuthGuard] },
  { path: 'group/new', component: AlertgroupsNewComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
