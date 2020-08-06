import {Component, Input, OnInit} from '@angular/core';
import { ClientModel } from '../../../shared/models';

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.scss']
})
export class ClientSelectorComponent implements OnInit {

  @Input() clients: ClientModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
