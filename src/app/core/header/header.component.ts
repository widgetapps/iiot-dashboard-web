import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as fromUser from '../auth/login/store'
import * as fromClient from '../../modules/clients/store';
import { select, Store } from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  clients$ = this.store.pipe(select(fromClient.selectAllClients));
  user$ = this.store.pipe(select(fromUser.selectUser));

  constructor(
    private store: Store
  ) { }

  @Output() public sidenavToggle = new EventEmitter();

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
