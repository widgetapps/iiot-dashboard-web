import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AlertGroupModel, AlertModel, AssetModel} from "../../../shared/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertGroupsStoreFacade } from "../alertgroups/store/alertgroups-store-facade";
import { AssetsStoreFacade } from "../../assets/store/assets-store-facade";
import { ListItemModel } from "../../../shared/components/chip-autocomplete/models";
import { Observable } from "rxjs";
import { map, pluck } from "rxjs/internal/operators";

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.scss']
})
export class AlertFormComponent implements OnInit {

  @Input() alertData: AlertModel = {
    _id: '',
    name: '',
    assets: [],
    sensor: '',
    alertGroupCodes: [],
    active: false,
    frequencyMinute: 15,
    limits: {
      low: 0,
      high: 10
    }
  };

  alertForm: FormGroup;
  alertGroupsItems$: Observable<ListItemModel[]>;
  assetItems$: Observable<ListItemModel[]>;

  @Output() save = new EventEmitter<AlertModel>();

  constructor(
    private fb: FormBuilder,
    private alertGroupsFacade: AlertGroupsStoreFacade,
    private assetFacade: AssetsStoreFacade
  ) {
    this.alertForm = this.fb.group({
      name: [this.alertData.name],
      sensor: [this.alertData.sensor, Validators.required],
      assets: [this.alertData.assets],
      alertGroups: [this.alertData.alertGroupCodes],
      low: [this.alertData.limits.low],
      high: [this.alertData.limits.high]
    });
  }

  ngOnInit(): void {
    // Map alertGroups to alertGroupItems for the chip component to use.
    this.alertGroupsItems$ = this.alertGroupsFacade.alertGroups$.pipe(
      map((alertGroups: AlertGroupModel[]) => alertGroups.map(g => {
        let item = new ListItemModel();
        item.value = g.code;
        item.display = g.name;
        return item;
      }))
    );

    this.assetItems$ = this.assetFacade.assets$.pipe(
      map((assets: AssetModel[]) => assets.map(asset => {
          let item = new ListItemModel();
          item.value = asset._id;
          item.display = asset.name;
          return item;
      }))
    );
  }

  submit() {
    if (this.alertForm.valid) {
      this.save.emit(this.alertForm.value);
    }
  }

}
