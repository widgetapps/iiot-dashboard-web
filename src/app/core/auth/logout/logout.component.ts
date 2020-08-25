import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../store";
import { logout } from "../login/store/actions";
import { clearClients } from "../../../modules/clients/store/clients-actions";
import { clearTrends } from "../../../modules/trends/store/trends-actions";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(logout());
    this.store.dispatch(clearClients());
    this.store.dispatch(clearTrends());
  }

}
