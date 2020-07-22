import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendsRoutingModule } from './trends-routing.module';
import { TrendsComponent } from './trends.component';


@NgModule({
  declarations: [TrendsComponent],
  imports: [
    CommonModule,
    TrendsRoutingModule
  ]
})
export class TrendsModule { }
