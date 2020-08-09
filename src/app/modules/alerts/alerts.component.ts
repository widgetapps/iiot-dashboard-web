import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlertGroupsStoreFacade } from "./alertgroups/store/alertgroups-store-facade";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertsComponent implements OnInit {

  alertGroups$ = this.alertGroupsFacade.alertGroups$;

  constructor(private alertGroupsFacade: AlertGroupsStoreFacade) { }

  ngOnInit(): void {
  }

}
