import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientsStoreFacade } from "../../modules/clients/store/clients-store-facade";
import { ClientModel } from "../../shared/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser;
  clients$ = this.clientsFacade.clients$;
  clientsTrackByFn = (index: number, client: ClientModel) => client._id;

  constructor(private clientsFacade: ClientsStoreFacade) { }

  @Output() public sidenavToggle = new EventEmitter();

  ngOnInit(): void {
    this.currentUser = true;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
