import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./core/auth/login/login.component";
import { LogoutComponent } from "./core/auth/logout/logout.component";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
  { path: 'alerts', loadChildren: () => import('./modules/alerts/alerts.module').then(m => m.AlertsModule), canActivate: [AuthGuard] },
  { path: 'assets', loadChildren: () => import('./modules/assets/assets.module').then(m => m.AssetsModule), canActivate: [AuthGuard] },
  { path: 'clients', loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule), canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'devices', loadChildren: () => import('./modules/devices/devices.module').then(m => m.DevicesModule), canActivate: [AuthGuard] },
  { path: 'locations', loadChildren: () => import('./modules/locations/locations.module').then(m => m.LocationsModule), canActivate: [AuthGuard] },
  { path: 'notifications', loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule), canActivate: [AuthGuard] },
  { path: 'trends', loadChildren: () => import('./modules/trends/trends.module').then(m => m.TrendsModule), canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
