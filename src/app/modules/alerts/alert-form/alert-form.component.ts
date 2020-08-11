import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertModel } from "../../../shared/models";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.scss']
})
export class AlertFormComponent implements OnInit {

  alertForm: FormGroup;

  @Output() save = new EventEmitter<AlertModel>();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if (this.alertForm.valid) {
      this.save.emit(this.alertForm.value);
    }
  }

}
