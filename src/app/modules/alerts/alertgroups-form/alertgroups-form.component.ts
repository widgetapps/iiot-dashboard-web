import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertGroupModel } from "../../../shared/models";

@Component({
  selector: 'app-alertgroups-form',
  templateUrl: './alertgroups-form.component.html',
  styleUrls: ['./alertgroups-form.component.scss']
})
export class AlertgroupsFormComponent implements OnInit, OnChanges {

  @Input() alertGroupData: AlertGroupModel = {
    code: '',
    name: '',
    contacts: [{
      name: '',
      sms: {
        send: false,
        number: ''
      },
      email: {
        send: false,
        address: ''
      }
    }]
  };

  alertgroupsForm: FormGroup;

  get contacts() {
    return this.alertgroupsForm.get('contacts') as FormArray;
  }

  @Output() save = new EventEmitter<AlertGroupModel>();
  private groupContacts: FormArray;

  constructor(private fb: FormBuilder) {
    this.alertgroupsForm = this.fb.group({
      code: [this.alertGroupData.code],
      name: [this.alertGroupData.name, Validators.required],
      contacts: this.fb.array([])
    });
  }

  createContactForForm(contact) {
    return this.fb.group( {
      name: [contact.name],
      sms: this.fb.group({
        send: [contact.sms.send],
        number: [contact.sms.number]
      }),
      email: this.fb.group({
        send: [contact.email.send],
        address: [contact.email.address]
      })
    })
  }

  ngOnInit(): void {
    this.groupContacts = this.contacts;
    for (let c of this.alertGroupData.contacts) {
      this.groupContacts.push(this.createContactForForm(c));
    }
  }

  ngOnChanges() {
    if (this.alertGroupData) {
      this.alertgroupsForm.patchValue({...this.alertGroupData});
    }
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
