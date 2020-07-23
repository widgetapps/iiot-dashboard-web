import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./core/auth/login/login.component";
import {LogoutComponent} from "./core/auth/logout/logout.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
  { path: 'alerts', loadChildren: () => import('./modules/alerts/alerts.module').then(m => m.AlertsModule) },
  { path: 'assets', loadChildren: () => import('./modules/assets/assets.module').then(m => m.AssetsModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'devices', loadChildren: () => import('./modules/devices/devices.module').then(m => m.DevicesModule) },
  { path: 'locations', loadChildren: () => import('./modules/locations/locations.module').then(m => m.LocationsModule) },
  { path: 'notifications', loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'trends', loadChildren: () => import('./modules/trends/trends.module').then(m => m.TrendsModule) },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
