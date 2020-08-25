import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AlertModel } from "../../../shared/models";
import { AlertsStoreFacade } from "./store/alerts-store-facade";
import * as authHelper from '../../../shared/helpers/auth.helper';
import {Router} from "@angular/router";

@Component({
  selector: 'app-alertlist',
  templateUrl: './alertlist.component.html',
  styleUrls: ['./alertlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertlistComponent implements OnInit {

  @Input() alerts: AlertModel[];

  alertsTrackByFn = (index: number, alert: AlertModel) => alert._id;

  constructor(
    private alertsFacade: AlertsStoreFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  removeAlert(id: string) {
    this.alertsFacade.deleteAlert(authHelper.getUser().client, id);
  }

  editAlert(id: string) {
    this.router.navigate(['/alerts', id, 'edit']);
  }

}
