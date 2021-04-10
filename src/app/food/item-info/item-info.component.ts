import { Component, OnInit, Input, Output } from '@angular/core';
import { Food } from 'src/app/food/food';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/site/auth.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { routes } from 'src/app/app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  @Input() food: Food;
  @Output() addedToFavorite: EventEmitter<number> = new EventEmitter<number>();
  itemAdded = false;
  constructor(private router: Router, private authService: AuthService, private userAuthService: UserAuthService) { }
  // food:Food={
  //   foodId: 1,
  //   foodPic: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80",
  //   foodTitle: "Sandwich",
  //   foodPrice: 129,
  //   foodActive: true,
  //   foodCategory: "Main Course",
  //   foodDOL: new Date("2017/03/15"),
  //   foodFree: true
  // }
  ngOnInit() {
    
  }
  onAddToCart(foodId: number) {
   
      console.log(foodId)
      this.addedToFavorite.emit(foodId);
      this.itemAdded = true;
      setTimeout(() => {
        this.itemAdded = false;
      }, 1000); return false;
  
  }
  isEditAllowed() {
    return this.userAuthService.loggedIn && this.userAuthService.isAdminUser();
  }
  getRole(){
    return this.userAuthService.getRole();
   }
}
