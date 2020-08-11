import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertGroupModel} from "../../../shared/models";
import {AlertgroupsFormComponent} from "../alertgroups-form/alertgroups-form.component";

@Component({
  selector: 'app-alertgroups-new',
  templateUrl: './alertgroups-new.component.html',
  styleUrls: ['./alertgroups-new.component.scss']
})
export class AlertgroupsNewComponent implements OnInit {

  @ViewChild(AlertgroupsFormComponent) childForm: AlertgroupsFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  newAlertGroup() {
    this.childForm.submit();
  }

  submitted(alertGroup: AlertGroupModel) {
    console.log(alertGroup);
    //this.contactsFacade.createContact(contact);
    //this.router.navigate(['/contacts']);
  }

}
