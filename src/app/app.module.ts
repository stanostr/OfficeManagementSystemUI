import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeHomepageComponent } from './employee/employee-homepage.component';
import { AdminHomepageComponent } from './admin/admin-homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './_services/http-interceptor.service';
import { AuthGuard, AdminAuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminReservationsComponent } from './admin/admin-reservations/admin-reservations.component';
import { AdminTasksComponent} from './admin/admin-tasks/admin-tasks.component';
import { AdminLeavesComponent } from './admin/admin-leaves/admin-leaves.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { MatDialogModule, MatDialogRef } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminNewTaskComponent } from './admin/admin-tasks/admin-new-task/admin-new-task.component';
import { AdminDeleteTaskComponent } from './admin/admin-tasks/admin-delete-task/admin-delete-task.component';
import { AdminEditTaskComponent } from './admin/admin-tasks/admin-edit-task/admin-edit-task.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';
import { DeleteUserComponent } from './admin/admin-users/delete-user/delete-user.component';
import { ViewEditUserComponent } from './admin/admin-users/view-edit-user/view-edit-user.component';
import { AddUserComponent } from './admin/admin-users/add-user/add-user.component';
import { AdminRoomsComponent } from './admin/admin-rooms/admin-rooms.component';
import { AdminDepartmentsComponent } from './admin/admin-departments/admin-departments.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeHomepageComponent,
    AdminHomepageComponent,
    LoginComponent,
    LogoutComponent,
    AdminDashboardComponent,
    AdminReservationsComponent,
    AdminTasksComponent,
    AdminLeavesComponent,
    AdminUsersComponent,
    AdminNewTaskComponent,
    AdminDeleteTaskComponent,
    AdminEditTaskComponent,
    AlertComponent,
    DeleteUserComponent,
    ViewEditUserComponent,
    AddUserComponent,
    AdminRoomsComponent,
    AdminDepartmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  entryComponents: [AppComponent, AdminNewTaskComponent, AdminDeleteTaskComponent, AdminEditTaskComponent, DeleteUserComponent, ViewEditUserComponent, AddUserComponent],
  providers: [AlertService, AuthGuard, AdminAuthGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, {provide: MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
