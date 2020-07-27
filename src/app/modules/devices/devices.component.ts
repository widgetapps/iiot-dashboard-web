import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Device } from "../../shared/models";
import { DevicesStoreFacade } from "./store/store-facade";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store";
import { getAll } from "./store/actions";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesComponent implements OnInit {

  devices$ = this.devicesFacade.devices$;
  devicesTrackByFn = (index: number, device: Device) => device._id;

  constructor(private devicesFacade: DevicesStoreFacade, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
  }

  loadDevices() {
    this.store.dispatch(getAll({clientId: 'llll'}));
  }

}
