import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientsStoreFacade } from "../../modules/clients/store/clients-store-facade";
import * as fromUser from '../auth/login/store'
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  clients$ = this.clientsFacade.clients$;
  user$ = this.store.pipe(select(fromUser.selectUser));
  //clientsTrackByFn = (index: number, client: ClientModel) => client._id;

  constructor(
    private clientsFacade: ClientsStoreFacade,
    private store: Store
  ) { }

  @Output() public sidenavToggle = new EventEmitter();

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
