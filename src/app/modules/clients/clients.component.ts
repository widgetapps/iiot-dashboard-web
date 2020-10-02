import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllClients, setSelectedClient} from "./store/clients-actions";
import * as authHelper from "../../shared/helpers/auth.helper";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

}
