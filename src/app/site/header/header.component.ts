import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shopping/cart/cart.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string
  constructor(private cartService: CartService, private authService: AuthService, private router: Router, private userAuthService: UserAuthService) {

  }

  ngOnInit() {
    // this.username = this.userAuthService.getUsername();
    // console.log(this.username);
    
  }
  // isAuthenticated(){
  //   return this.authService.loggedIn;
  // }
  // isAdmin(){
  //   return this.authService.isAdmin;
  // }
  // getUser(){
  //   return this.authService.userAuthenticated;
  // }
  // onSignOut(){
  //   this.cartService.clearCart();
  //   this.authService.logOut();
  //   this.router.navigate([this.authService.redirectUrl]);
  // }



  isAuthenticated() {
    return this.userAuthService.loggedIn;
  }
  isAdmin() {
    return this.userAuthService.isAdmin;
  }
  getUser() {
    return this.userAuthService.getUsername();
  }
  onSignOut() {
    this.cartService.clearCart();
    this.userAuthService.logOut();
    this.router.navigate([this.userAuthService.redirectUrl]);
  }

}
