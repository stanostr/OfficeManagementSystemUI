import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { EmployeeHomepageComponent } from './employee-homepage/employee-homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  { path: 'admin', component: AdminHomepageComponent },
  { path: 'employee', component: EmployeeHomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  {
    path: 'logout', component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
