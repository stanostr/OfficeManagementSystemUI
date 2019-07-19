import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './admin/admin-homepage.component';
import { EmployeeHomepageComponent } from './employee/employee-homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard, AdminAuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLeavesComponent } from './admin/admin-leaves/admin-leaves.component';
import { AdminReservationsComponent } from './admin/admin-reservations/admin-reservations.component';
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminDepartmentsComponent } from './admin/admin-departments/admin-departments.component';
import { AdminRoomsComponent } from './admin/admin-rooms/admin-rooms.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminHomepageComponent, canActivate: [AuthGuard, AdminAuthGuard],
    children: [
      {path: '', redirectTo: 'employees', pathMatch: 'full'}, 
      {path: 'dashboard', component: AdminDashboardComponent}, 
      {path: 'leave_requests', component: AdminLeavesComponent}, 
      {path: 'reservations', component: AdminReservationsComponent}, 
      {path: 'tasks', component: AdminTasksComponent},
      {path: 'employees', component: AdminUsersComponent},
      {path: 'departments', component: AdminDepartmentsComponent},
      {path: 'rooms', component: AdminRoomsComponent},
      {path: 'reservations', component: AdminReservationsComponent},


    ]
  },
  { path: 'employee', component: EmployeeHomepageComponent, canActivate: [AuthGuard] },
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
