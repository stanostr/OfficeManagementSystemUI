import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeHomepageComponent } from './employee/employee-homepage.component';
import { AdminHomepageComponent } from './admin/admin-homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientService } from './_services/http-client.service';
import { HttpInterceptorService } from './_services/http-interceptor.service';
import { EmployeeHeaderComponent } from './employee/employee-header/employee-header.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminReservationsComponent } from './admin/admin-reservations/admin-reservations.component';
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { AdminLeavesComponent } from './admin/admin-leaves/admin-leaves.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeHomepageComponent,
    AdminHomepageComponent,
    LoginComponent,
    LogoutComponent,
    EmployeeHeaderComponent,
    AdminDashboardComponent,
    AdminReservationsComponent,
    AdminTasksComponent,
    AdminLeavesComponent,
    AdminUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard, HttpClientService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
