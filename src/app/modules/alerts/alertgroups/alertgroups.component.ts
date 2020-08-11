import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AlertGroupModel } from "../../../shared/models";
import { AlertGroupsStoreFacade } from "./store/alertgroups-store-facade";
import * as authHelper from '../../../shared/helpers/auth.helper';

@Component({
  selector: 'app-alertgroups',
  templateUrl: './alertgroups.component.html',
  styleUrls: ['./alertgroups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertgroupsComponent implements OnInit {

  @Input() alertGroups: AlertGroupModel[];

  alertGroupsTrackByFn = (index: number, alertGroup: AlertGroupModel) => alertGroup.code;

  constructor(
    private alertGroupsFacade: AlertGroupsStoreFacade
  ) { }

  ngOnInit(): void {
  }

  removeAlertGroup(code: string) {
    this.alertGroupsFacade.deleteAlertGroup(authHelper.getUser().client, code);
  }

  editAlertGroup(code: string) {

  }

}
