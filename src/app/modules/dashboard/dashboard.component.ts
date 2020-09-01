import { Component, OnInit } from '@angular/core';
import { getAll } from "../clients/store/clients-actions";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAll());
  }

}
