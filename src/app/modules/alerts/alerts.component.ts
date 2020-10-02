import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlertGroupsStoreFacade } from "./alertgroups/store/alertgroups-store-facade";
import { AlertsStoreFacade } from "./alertlist/store/alerts-store-facade";
import {Store} from "@ngrx/store";
import {getAllClients, setSelectedClient} from "../clients/store/clients-actions";
import * as authHelper from "../../shared/helpers/auth.helper";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertsComponent implements OnInit {

  alertGroups$ = this.alertGroupsFacade.alertGroups$;
  alerts$ = this.alertsFacade.alerts$;

  constructor(
    private alertGroupsFacade: AlertGroupsStoreFacade,
    private alertsFacade: AlertsStoreFacade,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

}
