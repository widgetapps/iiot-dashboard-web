import { Component, OnInit } from '@angular/core';
import {getAllClients, setSelectedClient} from "../clients/store/clients-actions";
import { Store } from "@ngrx/store";
import * as authHelper from "../../shared/helpers/auth.helper";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

}
