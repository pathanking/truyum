import { Injectable } from '@angular/core';
import { User } from '../site/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  addUser(user: User) {
    console.log("FROM USER SERVICE -> " + user)
    return this.httpClient.post(this.baseUrl + "/users", user);
  }
}
