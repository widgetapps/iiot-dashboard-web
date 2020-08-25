import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertgroupsFormComponent} from "../alertgroups-form/alertgroups-form.component";
import {AlertGroupModel} from "../../../shared/models";
import * as authHelper from "../../../shared/helpers/auth.helper";
import {map, switchMap} from "rxjs/internal/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertGroupsStoreFacade} from "../alertgroups/store/alertgroups-store-facade";

@Component({
  selector: 'app-alertgroups-edit',
  templateUrl: './alertgroups-edit.component.html',
  styleUrls: ['./alertgroups-edit.component.scss']
})
export class AlertgroupsEditComponent implements OnInit {

  @ViewChild(AlertgroupsFormComponent) childForm: AlertgroupsFormComponent;

  alertGroup$= this.activatedRoute.params.pipe(
    map( params => params.id),
    switchMap(id => this.alertGroupsFacade.getAlertGroupById(id))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertGroupsFacade: AlertGroupsStoreFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.childForm.submit();
  }

  submitted(alertGroup: AlertGroupModel) {
    this.alertGroupsFacade.editAlertGroup(authHelper.getUser().client, alertGroup.code, alertGroup);
    this.router.navigate(['/alerts']);
  }

}
