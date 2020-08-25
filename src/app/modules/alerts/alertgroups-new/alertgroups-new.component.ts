import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertGroupModel } from "../../../shared/models";
import { AlertgroupsFormComponent } from "../alertgroups-form/alertgroups-form.component";
import { AlertGroupsStoreFacade } from "../alertgroups/store/alertgroups-store-facade";
import { Router } from "@angular/router";
import * as authHelper from '../../../shared/helpers/auth.helper';

@Component({
  selector: 'app-alertgroups-new',
  templateUrl: './alertgroups-new.component.html',
  styleUrls: ['./alertgroups-new.component.scss']
})
export class AlertgroupsNewComponent implements OnInit {

  @ViewChild(AlertgroupsFormComponent) childForm: AlertgroupsFormComponent;

  constructor(
    private alertGroupsFacade: AlertGroupsStoreFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.childForm.submit();
  }

  submitted(alertGroup: AlertGroupModel) {
    alertGroup.code = this.getAlertGroupCode(8);
    this.alertGroupsFacade.createAlertGroup(authHelper.getUser().client, alertGroup);
    this.router.navigate(['/alerts']);
  }

  private getAlertGroupCode(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

}
