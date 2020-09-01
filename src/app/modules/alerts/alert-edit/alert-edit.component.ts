import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertFormComponent} from "../alert-form/alert-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertsStoreFacade} from "../alertlist/store/alerts-store-facade";
import {map, switchMap} from "rxjs/internal/operators";
import {AlertGroupModel, AlertModel} from "../../../shared/models";
import * as authHelper from "../../../shared/helpers/auth.helper";

@Component({
  selector: 'app-alert-edit',
  templateUrl: './alert-edit.component.html',
  styleUrls: ['./alert-edit.component.scss']
})
export class AlertEditComponent implements OnInit {

  @ViewChild(AlertFormComponent) childForm: AlertFormComponent;

  alert$ = this.activatedRoute.params.pipe(
    map(params => params.id),
    switchMap(id => this.alertsFacade.getAlertById(id))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertsFacade: AlertsStoreFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.childForm.submit();
  }

  submitted(alert: AlertModel) {
    this.alertsFacade.editAlert(authHelper.getUser().client, alert._id, alert);
    this.router.navigate(['/alerts']);
  }

}
