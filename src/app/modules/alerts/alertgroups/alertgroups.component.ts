import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { AlertGroupModel } from "../../../shared/models";

@Component({
  selector: 'app-alertgroups',
  templateUrl: './alertgroups.component.html',
  styleUrls: ['./alertgroups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertgroupsComponent implements OnInit {

  @Input() alertGroups: AlertGroupModel[];

  alertGroupsTrackByFn = (index: number, alertGroup: AlertGroupModel) => alertGroup.code;

  constructor() { }

  ngOnInit(): void {
  }

}
