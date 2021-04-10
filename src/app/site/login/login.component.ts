import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { TouchSequence } from 'selenium-webdriver';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginValid = true;
  authSource: boolean;
  authenticationFailed:boolean;
  error:string;
  // password:string;
  loggedIn:boolean;
  menuItemId:number;
  isMenuItemIdPresent=true;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,private userAuthService:UserAuthService,private authenticationService:AuthenticationService) { }
    

  ngOnInit() {
    console.log(this.userAuthService.getMenuItemId()) 
    if(this.userAuthService.getMenuItemId()>0){
      console.log(this.userAuthService.getMenuItemId()) 
      this.isMenuItemIdPresent=true;
    }else{
      this.isMenuItemIdPresent= false
    }
    // if(this.userAuthService.getMenuItemId()){
    //   this.error="logging first before adding to the cart";
    //   this.isMenuItemIdPresent=true;
    //  }
     
    this.route.queryParams.subscribe((params: Params) => {
      this.authSource = params['from'];
    });
    
   
  }

  onSubmit(form: NgForm) {
    // const username = form.value.username;
    // const password = form.value.password;
    // if (username === 'john') { // temporary to show the invalid user login
    //   this.isLoginValid = false;
    // } else {
    //   this.authService.logIn(username, password);
    //   this.router.navigate([this.authService.redirectUrl]);
    // } 
    let username = form.value.username;
    let password = form.value.password;
    console.log(username);
    console.log(password);
    // this.userAuthService.setUsername(username);
    this.authenticationService.authenticate(username, password).subscribe((data) => {
      console.log(username)
      console.log(password)

      this.authenticationFailed = false;
      this.userAuthService.logIn(username, password);
      this.userAuthService.setUsername(data.user);
      console.log(data.user)
      this.userAuthService.setRole(data.role);
      console.log(data.role);
      this.userAuthService.setToken(data.token);
      
      this.router.navigate(['/menu']);
    },
      (error) => {
        console.log(`error` + JSON.stringify(error))
        this.authenticationFailed = true;
        if (error.status == 401) {
          this.error = "Invalid username/password";
        }
  });

  }
  
}