import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  show:boolean = false;

  toggleCollapse() {
    this.show = !this.show
  }
  constructor(private loginService:AuthenticationService) { }

  ngOnInit() {
  }

}
