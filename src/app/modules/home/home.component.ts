import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromUser from "../../core/auth/login/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$ = this.store.pipe(select(fromUser.selectUser));

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
