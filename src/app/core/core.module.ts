import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ClientSelectorComponent } from './header/client-selector/client-selector.component';
import { SidenavListComponent } from './header/sidenav-list/sidenav-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';



@NgModule({
  declarations: [HeaderComponent, ClientSelectorComponent, SidenavListComponent, LoginComponent, LogoutComponent],
  exports: [
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    ExtendedModule,
    FlexModule
  ]
})
export class CoreModule { }
