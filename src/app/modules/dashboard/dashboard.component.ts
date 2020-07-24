import { Component, OnInit } from '@angular/core';
import { selectUserId, selectUser } from "../../core/auth/login/store/selectors";
import { select, Store } from "@ngrx/store";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<{ }>) { }

  ngOnInit(): void {
  }

  loginStateToConsole() {
    //console.log('Logged In State: ' + getLoggedIn);
    this.store.select(selectUser).subscribe(data => {
      console.log('User State: ' + JSON.stringify(data));
    });
  }

}
