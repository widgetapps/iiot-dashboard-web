import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrendsComponent } from './trends.component';

const routes: Routes = [{ path: '', component: TrendsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendsRoutingModule { }
