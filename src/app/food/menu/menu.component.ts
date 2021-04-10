import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/food/food.service';
import { Food } from 'src/app/food/food';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/shopping/cart/cart.service';
import { AuthService } from 'src/app/site/auth.service';
import { Router } from '@angular/router';
import { MenuItemsService } from 'src/app/service/menu-items.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  filteredFood: Food[];
  constructor(private foodService: FoodService,private userAuthService:UserAuthService,private menuItemService:MenuItemsService, private http: HttpClient, private cartService: CartService, private authService: AuthService, private router: Router) {
    // this.filteredFood = this.foodService.getAllFoodItems();
  }
  foodItemList: Food[];
  activeFoodList: Food[];
  // foodItems : Food[]=[{
  //   foodId : 1,
  //   	foodTitle : "Sandwich",
  //   	foodPrice : 99,
  //   foodActive : true,
  //   	foodDOL : new Date("2017/03/15") , 
  //   	foodCategory : "Main Course",
  //       foodFree: true,
  //     foodPic:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
  //     },
  //     {
  //       foodId : 2,
  //       foodTitle : "Burger",
  //   	foodPrice : 129,
  //   	foodActive : true,
  //   	foodDOL : new Date("2017/12/23") , 
  //   	foodCategory : "Main Course",
  //       foodFree: false,
  //       foodPic : "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  //     },
  //     {
  //       foodId : 3,
  //       foodTitle : "Pizza",
  //       foodPrice : 149,
  //   	foodActive : true,
  //   	foodDOL : new Date("2017/08/07") , 
  //   	foodCategory : "Main Course",
  //       foodFree: false,
  //       foodPic : "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
  //     },
  //     {
  //       foodId : 4,
  //   	foodTitle : "French Fries",
  //   	foodPrice : 57,
  //   	foodActive : false,
  //   	foodDOL : new Date("2017/07/02") , 
  //   	foodCategory : "Starter",
  //       foodFree: true,
  //       foodPic : "https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  //     },
  //     {
  //       foodId : 5,
  //   	foodTitle : "Chocolate Brownie",
  //   	foodPrice : 32,
  //   	foodActive : true,
  //   	foodDOL : new Date("2034/11/02") , 
  //   	foodCategory : "Dessert",
  //       foodFree: true,
  //       foodPic : "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80"
  //     },
  //   ];


  ngOnInit() {
    console.log('in menu');
    // this.filteredFood=this.foodService.getFoodItems();
    // this.foodService.getFoods().subscribe((food: Food[]) => {
    //   this.foodItemList = [...food]; // maintain original copy
    //   this.filteredFood = [...food]; // update list rendered in template
    // });

    // // refresh products rendered, based on the search text
    // // recieve the search text from "subject" event



    // this.foodService.filter.subscribe((obj: { title: string }) => {
    //   if (obj.title !== '') { // filter from original list for search text, and update list rendered
    //     const result = this.foodItemList.filter(food => food.name.toLowerCase().includes(obj.title.toLowerCase()));
    //     this.filteredFood = result ? result : [];
    //   } else { // reset to original food list, if not search text entered
    //     this.filteredFood = [...this.foodItemList];
    //   }
    // });

    // if (this.userAuthService.isAdminUser()) {
      this.menuItemService.getAllMenuItems().subscribe(data=>{
        this.foodItemList =data;
        this.filteredFood = data;
      });
      // this.foodService.getFoods().subscribe((food: Food[]) => {
      //   this.foodItemList = [...food];
      //   this.filteredFood = [...food];

      // });
      // this.menuItemService.filter.subscribe((obj: { title: string }) => {
      //   if (obj.title !== '') {
      //     const result = this.foodItemList.filter(
      //       food => food.name.toLowerCase().includes(obj.title.toLowerCase())
      //     );
      //     this.filteredFood = result ? result : [];
      //   } else {
      //     this.filteredFood = [...this.foodItemList];
      //   }
      // });

    // } 
   
      // this.filteredFood = this.foodService.getFoodItems();
      // this.foodItemList = this.filteredFood;
      this.menuItemService.filter.subscribe((obj: { title: string }) => {
        if (obj.title !== '') {
          const result = this.foodItemList.filter(
            food => food.name.toLowerCase().includes(obj.title.toLowerCase())
          );
          this.filteredFood = result ? result : [];
        } else {
          this.filteredFood = [...this.foodItemList];
        }
      });

   
    
  }
  addFoodToCart(productId: number) {
    // this.cartService.addToCart(productId, 1);
    // if (!this.userAuthService.loggedIn) {
    //   this.router.navigate(['cart']);
    // }
    //  if (!this.userAuthService.loggedIn) {
    //   this.userAuthService.setMenuItemId(productId);
    //   this.router.navigate(['login']);
    // }
    if(this.userAuthService.loggedIn){
    this.menuItemService.addCartItem(this.userAuthService.getUsername(),productId).subscribe();
    }else{
      this.userAuthService.setMenuItemId(productId);
      this.router.navigate(['login']);
    }
    
  }
  isAdmin() {
    return this.userAuthService.isAdmin;
  }
  
}
