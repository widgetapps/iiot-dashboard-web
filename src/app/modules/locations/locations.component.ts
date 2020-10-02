import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllClients, setSelectedClient} from "../clients/store/clients-actions";
import * as authHelper from "../../shared/helpers/auth.helper";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClients());
    this.store.dispatch(setSelectedClient({client: authHelper.getUser().client}));
  }

}
