import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ClientSelectorComponent } from './header/client-selector/client-selector.component';
import { SidenavListComponent } from './header/sidenav-list/sidenav-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [HeaderComponent, ClientSelectorComponent, SidenavListComponent],
  exports: [
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule
  ]
})
export class CoreModule { }
