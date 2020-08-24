import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlertGroupsStoreFacade } from "./alertgroups/store/alertgroups-store-facade";
import { AlertsStoreFacade } from "./alertlist/store/alerts-store-facade";

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
    private alertsFacade: AlertsStoreFacade
  ) { }

  ngOnInit(): void {
  }

}
