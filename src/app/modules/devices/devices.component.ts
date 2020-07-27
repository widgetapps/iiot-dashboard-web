import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Device } from "../../shared/models";
import { DevicesStoreFacade } from "./store/store-facade";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesComponent implements OnInit {

  devices$ = this.devicesFacade.devices$;
  devicesTrackByFn = (index: number, device: Device) => device._id;

  constructor(private devicesFacade: DevicesStoreFacade) { }

  ngOnInit(): void {
  }

}
