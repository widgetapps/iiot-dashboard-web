import { Component, OnInit } from '@angular/core';
import { AlertModel } from "../../../shared/models";

@Component({
  selector: 'app-alertlist',
  templateUrl: './alertlist.component.html',
  styleUrls: ['./alertlist.component.scss']
})
export class AlertlistComponent implements OnInit {

  alerts: AlertModel[];

  alertsTrackByFn = (index: number, alert: AlertModel) => alert._id;

  constructor() { }

  ngOnInit(): void {
  }

  removeAlert(id: string) {

  }

  editAlert(id: string) {

  }

}
