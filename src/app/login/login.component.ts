import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private static INVALID_CREDENTIALS_MESSAGE:string = 'Incorrect username or password.';
  private static GENERAL_ERROR:string = 'An error has occured. Contact an administrator if problem persists.';

  header:string = 'E-Office Management System';
  username:string;
  password:string;
  error:string;
  constructor(private loginService:AuthenticationService, private router:Router) { }

  checkLogin()
  {
    this.loginService.authenticate(this.username, this.password).subscribe(
      loginResponse => {
        let role:string = sessionStorage.getItem('role');
        if(loginResponse.ok && role=='ROLE_ADMIN')
        {
          this.router.navigate(['admin'])
        }
        else if(loginResponse.ok && role=='ROLE_USER')
        {
          this.router.navigate(['employee'])
        }
    },
    error => {
      if(error.status==401)
        this.error = LoginComponent.INVALID_CREDENTIALS_MESSAGE; 
      else this.error = LoginComponent.GENERAL_ERROR;
    });
  }

  ngOnInit() {
  }

}
