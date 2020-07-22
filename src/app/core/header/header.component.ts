import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser;

  constructor() { }

  @Output() public sidenavToggle = new EventEmitter();

  ngOnInit(): void {
    this.currentUser = true;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
