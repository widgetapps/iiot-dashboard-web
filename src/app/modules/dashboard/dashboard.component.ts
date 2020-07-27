import { Component, OnInit } from '@angular/core';
import * as authHelper from '../../shared/helpers/auth.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginStateToConsole() {
    //console.log('Logged In State: ' + getLoggedIn);
    console.log('Token: ' + authHelper.getJwt());
    console.log('API Key: ' + authHelper.getApiKey());
  }

}
