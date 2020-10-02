import { Component, OnInit } from '@angular/core';
import {getAllClients, setSelectedClient} from "../clients/store/clients-actions";
import {Store} from "@ngrx/store";
import * as authHelper from "../../shared/helpers/auth.helper";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

}
