import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from '../../../shared/models';
import { select, Store } from "@ngrx/store";
import { setSelectedClient } from "../../../modules/clients/store/clients-actions";
import { getTags } from "../../../modules/trends/store/trends-actions";
import { getSelectedClient } from "../../../modules/clients/store";

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.scss']
})
export class ClientSelectorComponent implements OnInit, OnDestroy {

  @Input() clients: ClientModel[];

  private clientSub;
  public clientId;

  constructor(private store: Store<{ }>) { }

  ngOnInit(): void {
    this.clientSub = this.store.pipe(select(getSelectedClient)).subscribe((clientId) => {this.clientId = clientId});
  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }

  updateSelectedClient(e) {
    this.store.dispatch(setSelectedClient({client: e.value}));
    this.store.dispatch(getTags({clientId: e.value}));
  }

}
