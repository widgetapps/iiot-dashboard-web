import { Component, OnInit } from '@angular/core';
import { AlertGroupsStoreFacade } from "./store/alertgroups-store-facade";
import { AlertGroupModel } from "../../../shared/models";

@Component({
  selector: 'app-alertgroups',
  templateUrl: './alertgroups.component.html',
  styleUrls: ['./alertgroups.component.scss']
})
export class AlertgroupsComponent implements OnInit {

  alertGroups$ = this.alertGroupsFacade.alertGroups$;
  alertGroupsTrackByFn = (index: number, alertGroup: AlertGroupModel) => alertGroup.code;

  constructor(private alertGroupsFacade: AlertGroupsStoreFacade) { }

  ngOnInit(): void {
  }

}
