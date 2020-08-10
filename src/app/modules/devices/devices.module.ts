import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { DevicesStoreFacade } from "./store/devices-store-facade";
import { StoreModule } from "@ngrx/store";
import * as fromDevices from './store/devices-reducer';
import { ClientsService } from "../../shared/services/api";
import { EffectsModule } from "@ngrx/effects";
import { DeviceEffects } from "./store/devices-effects";

@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    StoreModule.forFeature(fromDevices.featureKey, fromDevices.reducer),
    EffectsModule.forFeature([DeviceEffects])
  ],
  providers: [DevicesStoreFacade, ClientsService]
})

export class DevicesModule { }
