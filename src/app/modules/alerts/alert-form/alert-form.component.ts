import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertGroupModel, AlertModel } from "../../../shared/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertGroupsStoreFacade } from "../alertgroups/store/alertgroups-store-facade";
import { ListItemModel } from "../../../shared/components/chip-autocomplete/models";
import {Observable} from "rxjs";
import {map, pluck} from "rxjs/internal/operators";

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.scss']
})
export class AlertFormComponent implements OnInit {

  alertForm: FormGroup;
  alertGroupsItems$: Observable<ListItemModel[]>;

  @Output() save = new EventEmitter<AlertModel>();

  constructor(
    private fb: FormBuilder,
    private alertGroupsFacade: AlertGroupsStoreFacade
  ) {
    this.alertForm = this.fb.group({
      name: [''],
      sensor: ['', Validators.required],
      min: [''],
      max: ['']
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
  }

  submit() {
    if (this.alertForm.valid) {
      this.save.emit(this.alertForm.value);
    }
  }

}
