import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertModel } from "../../../shared/models";
import * as authHelper from "../../../shared/helpers/auth.helper";
import { AlertFormComponent } from "../alert-form/alert-form.component";
import { AlertsStoreFacade } from "../alertlist/store/alerts-store-facade";
import { Router } from "@angular/router";

@Component({
  selector: 'app-alert-new',
  templateUrl: './alert-new.component.html',
  styleUrls: ['./alert-new.component.scss']
})
export class AlertNewComponent implements OnInit {

  @ViewChild(AlertFormComponent) childForm: AlertFormComponent;

  constructor(
    private alertFacade: AlertsStoreFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.childForm.submit();
  }

  submitted(alert: any) {
    delete alert._id;
    alert.active = true;
    alert.frequencyMinutes = 10;
    alert.alertGroupCodes = alert.alertGroupCodes.map(group => {
      return group.value;
    });
    alert.assets = alert.assets.map(asset => {
      return asset.value;
    })

    const newAlert: AlertModel = {...alert };

    this.alertFacade.createAlert(authHelper.getUser().client, newAlert);
    this.router.navigate(['/alerts']);
  }

}
