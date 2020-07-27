import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ClientSelectorComponent } from './header/client-selector/client-selector.component';
import { SidenavListComponent } from './header/sidenav-list/sidenav-list.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatMenuModule} from "@angular/material/menu";
import { MatIconModule} from "@angular/material/icon";
import { MatListModule} from "@angular/material/list";
import { MatButtonModule} from "@angular/material/button";
import { RouterModule} from "@angular/router";
import { ExtendedModule, FlexModule} from "@angular/flex-layout";
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MatCardModule} from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import { ReactiveFormsModule} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";

import { StoreModule } from '@ngrx/store';
import * as fromLogin from './auth/login/store/reducer';
import { AuthenticationService } from "../shared/services/authentication.service";

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
    FlexModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    StoreModule.forFeature(fromLogin.featureKey, fromLogin.reducer)
  ],
  providers: [AuthenticationService]
})
export class CoreModule { }
