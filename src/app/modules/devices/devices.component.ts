import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeviceModel } from "../../shared/models";
import { DevicesStoreFacade } from "./store/devices-store-facade";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../store";
import {getAllClients, setSelectedClient} from "../clients/store/clients-actions";
import * as authHelper from "../../shared/helpers/auth.helper";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesComponent implements OnInit {

  devices$ = this.devicesFacade.devices$;
  devicesTrackByFn = (index: number, device: DeviceModel) => device._id;

  constructor(
    private devicesFacade: DevicesStoreFacade,
    private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

}
