import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeviceModel } from "../../shared/models";
import { DevicesStoreFacade } from "./store/devices-store-facade";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../store";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesComponent implements OnInit {

  devices$ = this.devicesFacade.devices$;
  devicesTrackByFn = (index: number, device: DeviceModel) => device._id;

  constructor(private devicesFacade: DevicesStoreFacade, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
  }

}
