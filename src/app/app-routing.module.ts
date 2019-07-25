import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './admin/admin-homepage.component';
import { EmployeeHomepageComponent } from './employee/employee-homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard, AdminAuthGuard, EmployeeAuthGuard } from './auth.guard';
import { AdminLeavesComponent } from './admin/admin-leaves/admin-leaves.component';
import { AdminReservationsComponent } from './admin/admin-reservations/admin-reservations.component';
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminDepartmentsComponent } from './admin/admin-departments/admin-departments.component';
import { AdminRoomsComponent } from './admin/admin-rooms/admin-rooms.component';
import { EmployeeLeaveComponent } from './employee/employee-leave/employee-leave.component';
import { EmployeeRoomsComponent } from './employee/employee-rooms/employee-rooms.component';
import { EmployeeTasksComponent } from './employee/employee-tasks/employee-tasks.component';
import { EmployeeViewReservationsComponent } from './employee/employee-rooms/employee-view-reservations/employee-view-reservations.component';
import { EmployeeViewRoomsComponent } from './employee/employee-rooms/employee-view-rooms/employee-view-rooms.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminHomepageComponent, canActivate: [AuthGuard, AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'leave_requests', component: AdminLeavesComponent },
      { path: 'reservations', component: AdminReservationsComponent },
      { path: 'tasks', component: AdminTasksComponent },
      { path: 'employees', component: AdminUsersComponent },
      { path: 'departments', component: AdminDepartmentsComponent },
      { path: 'rooms', component: AdminRoomsComponent },
      { path: 'reservations', component: AdminReservationsComponent },
    ]
  },
  {
    path: 'employee', component: EmployeeHomepageComponent, canActivate: [AuthGuard, EmployeeAuthGuard],
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'leave_requests', component: EmployeeLeaveComponent },
      {
        path: 'reservations', component: EmployeeRoomsComponent,
        children:
          [
            { path: 'view_reservations', component: EmployeeViewReservationsComponent },
            { path: 'view_rooms', component: EmployeeViewRoomsComponent }
          ]
      },
      { path: 'tasks', component: EmployeeTasksComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  {
    path: 'logout', component: LogoutComponent
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
