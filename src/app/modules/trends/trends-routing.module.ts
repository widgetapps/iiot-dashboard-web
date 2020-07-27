import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrendsComponent } from './trends.component';
import { AuthGuard } from "../../core/guards/auth.guard";

const routes: Routes = [{ path: '', component: TrendsComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendsRoutingModule { }
