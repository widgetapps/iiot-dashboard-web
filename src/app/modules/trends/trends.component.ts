import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from "../../store";
import { getTrends } from "./store/trends-actions";

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
  }

  getTrends() {
    this.store.dispatch(getTrends({clientId: '', start: '', end: '', tags: '', interval: ''}));
  }

}
