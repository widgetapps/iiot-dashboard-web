import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertGroupModel } from "../../../shared/models";

@Component({
  selector: 'app-alertgroups-form',
  templateUrl: './alertgroups-form.component.html',
  styleUrls: ['./alertgroups-form.component.scss']
})
export class AlertgroupsFormComponent implements OnInit {

  alertgroupsForm = this.fb.group({
    code: [''],
    name: ['', Validators.required],
    contacts: this.fb.array([
      this.fb.group( {
        name: ['Test'],
        sms: this.fb.group({
          send: [false],
          number: ['']
        }),
        email: this.fb.group({
          send: [false],
          address: ['']
        })
      })
    ])
  });

  get contacts() {
    return this.alertgroupsForm.get('contacts') as FormArray;
  }

  @Output() save = new EventEmitter<AlertGroupModel>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addContactRow() {
    this.contacts.push(this.fb.group( {
      name: [''],
      sms: this.fb.group({
        send: [false],
        number: ['']
      }),
      email: this.fb.group({
        send: [false],
        address: ['']
      })
    }));

    return false;
  }

  removeContactRow(index){
    this.contacts.removeAt(index);

    return false;
  }

  submit() {
    if (this.alertgroupsForm.valid) {
      this.save.emit(this.alertgroupsForm.value);
    }
  }

}
