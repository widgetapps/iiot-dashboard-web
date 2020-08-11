import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsComponent } from './alerts.component';
import { AuthGuard } from "../../core/guards/auth.guard";
import { AlertgroupsNewComponent } from "./alertgroups-new/alertgroups-new.component";
import { AlertgroupsEditComponent } from "./alertgroups-edit/alertgroups-edit.component";
import { AlertNewComponent } from "./alert-new/alert-new.component";

const routes: Routes = [
  { path: '', component: AlertsComponent, canActivate: [AuthGuard] },
  { path: 'group/new', component: AlertgroupsNewComponent, canActivate: [AuthGuard]},
  { path: 'group/:id/edit', component: AlertgroupsEditComponent, canActivate: [AuthGuard]},
  { path: 'new', component: AlertNewComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
