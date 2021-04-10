import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { User } from "../site/user";
import { UserService } from "../site/user.service";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  username: any;
  private token: string;
  role: any;
  loggedIn = false;
  isAdmin = false;
  accessToken: string; // JWT token
  redirectUrl = "/";
  userAuthenticated: User;
  private menuItemApiUrl = "http://localhost:9000/menu-items";
  menuItemId: number;
  constructor(private route: Router, private userService: UserService) {
    console.log("user auth service");
  }
  getMenuItemId() {
    return this.menuItemId;
  }
  setMenuItemId(menuItemId: number) {
    this.menuItemId = menuItemId;
  }
  logIn(username: string, password: string) {
    this.userService
      .authenticate(username, password)
      .subscribe((user: User) => {
        if (user) {
          this.loggedIn = true;
          this.userAuthenticated = user;
          this.isAdmin = user.role === "Admin";
          if (this.isAdmin) {
            this.redirectUrl = "/menu";
          }
        }
      });
  }
  logOut() {
    this.redirectUrl = "/"; // reset to root url
    this.loggedIn = false;
    this.isAdmin = false;
    this.token = null;
    this.role = null;
  }
  isAdminUser() {
    return this.isAdmin;
  }
  setUsername(username: string) {
    this.username = username;
  }
  getUsername() {
    return this.username;
  }
  getRole() {
    return this.role;
  }
  setRole(role: any) {
    this.role = role;
  }
  public setToken(token: string) {
    this.token = token;
  }
  public getToken() {
    return this.token;
  }
}
