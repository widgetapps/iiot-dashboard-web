import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertModel } from "../../../shared/models";
import * as authHelper from "../../../shared/helpers/auth.helper";
import { AlertFormComponent } from "../alert-form/alert-form.component";

@Component({
  selector: 'app-alert-new',
  templateUrl: './alert-new.component.html',
  styleUrls: ['./alert-new.component.scss']
})
export class AlertNewComponent implements OnInit {

  @ViewChild(AlertFormComponent) childForm: AlertFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.childForm.submit();
  }

  submitted(alert: AlertModel) {
    console.log(alert);
    //alertGroup.code = this.getAlertGroupCode(8);
    //this.alertGroupsFacade.createAlertGroup(authHelper.getUser().client, alertGroup);
    //this.router.navigate(['/alerts']);
  }

}
