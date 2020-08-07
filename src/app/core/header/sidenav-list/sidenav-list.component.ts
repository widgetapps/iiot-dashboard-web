import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from "@ngrx/store";
import * as fromUser from "../../auth/login/store";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  user$ = this.store.pipe(select(fromUser.selectUser));

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
