import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeHomepageComponent } from './employee/employee-homepage.component';
import { AdminHomepageComponent } from './admin/admin-homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './_services/http-interceptor.service';
import { AuthGuard, AdminAuthGuard, EmployeeAuthGuard } from './auth.guard';
import { AdminReservationsComponent } from './admin/admin-reservations/admin-reservations.component';
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
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
import { DeleteDeptComponent } from './admin/admin-departments/delete-dept/delete-dept.component';
import { AddDeptComponent } from './admin/admin-departments/add-dept/add-dept.component';
import { AdminEditLeaveComponent } from './admin/admin-leaves/admin-edit-leave/admin-edit-leave.component';
import { AdminDeleteLeaveComponent } from './admin/admin-leaves/admin-delete-leave/admin-delete-leave.component';
import { AdminDeleteRoomComponent } from './admin/admin-rooms/admin-delete-room/admin-delete-room.component';
import { AdminAddTrainingRoomComponent } from './admin/admin-rooms/admin-add-training-room/admin-add-training-room.component';
import { AdminAddMeetingRoomComponent } from './admin/admin-rooms/admin-add-meeting-room/admin-add-meeting-room.component';
import { AdminReservationViewComponent } from './admin/admin-reservations/admin-reservation-view/admin-reservation-view.component';
import { EmployeeTasksComponent } from './employee/employee-tasks/employee-tasks.component';
import { EmployeeLeaveComponent } from './employee/employee-leave/employee-leave.component';
import { EmployeeRoomsComponent } from './employee/employee-rooms/employee-rooms.component';
import { EmployeeTaskViewComponent } from './employee/employee-tasks/employee-task-view/employee-task-view.component';
import { EmployeeLeaveViewComponent } from './employee/employee-leave/employee-leave-view/employee-leave-view.component';
import { EmployeeViewReservationsComponent } from './employee/employee-rooms/employee-view-reservations/employee-view-reservations.component';
import { EmployeeViewRoomsComponent } from './employee/employee-rooms/employee-view-rooms/employee-view-rooms.component';
import { NewReservationComponent } from './employee/employee-rooms/new-reservation/new-reservation.component';
import { WeatherComponent } from './weather/weather.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeHomepageComponent,
    AdminHomepageComponent,
    LoginComponent,
    LogoutComponent,
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
    AdminDepartmentsComponent,
    DeleteDeptComponent,
    AddDeptComponent,
    AdminEditLeaveComponent,
    AdminDeleteLeaveComponent,
    AdminDeleteRoomComponent,
    AdminAddTrainingRoomComponent,
    AdminAddMeetingRoomComponent,
    AdminReservationViewComponent,
    EmployeeTasksComponent,
    EmployeeLeaveComponent,
    EmployeeRoomsComponent,
    EmployeeTaskViewComponent,
    EmployeeLeaveViewComponent,
    EmployeeViewReservationsComponent,
    EmployeeViewRoomsComponent,
    NewReservationComponent,
    WeatherComponent,
    NotFoundComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AppComponent,
    AdminNewTaskComponent,
    AdminDeleteTaskComponent,
    AdminEditTaskComponent,
    DeleteUserComponent,
    ViewEditUserComponent,
    AddUserComponent,
    DeleteDeptComponent,
    AddDeptComponent,
    AdminEditLeaveComponent,
    EmployeeLeaveViewComponent,
    AdminDeleteLeaveComponent,
    AdminAddMeetingRoomComponent,
    AdminAddTrainingRoomComponent,
    AdminDeleteRoomComponent,
    AdminReservationViewComponent,
    EmployeeTaskViewComponent,
    NewReservationComponent,
    WeatherComponent,
    NewsComponent
  ],
  providers: [AlertService, AuthGuard, AdminAuthGuard, EmployeeAuthGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
