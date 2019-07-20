import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../_model/admin';

@Injectable({
  providedIn: 'root'
})
export class GetAdminDetailsService {

  constructor(private httpClient:HttpClient) { }

  public getAccount()
  {
    return this.httpClient.get<Admin>('http://localhost:8081/admin/account');
  }
}
