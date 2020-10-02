import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllClients, setSelectedClient} from "../clients/store/clients-actions";
import * as authHelper from "../../shared/helpers/auth.helper";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

}
