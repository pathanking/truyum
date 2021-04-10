import { Injectable } from '@angular/core';
import { Cart } from '../cart';
import { FoodService } from 'src/app/food/food.service';
import { Food } from 'src/app/food/food';
import { v4 as uuid } from 'uuid';
import { AuthService } from 'src/app/site/auth.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = {
    items: null,
    menuItemList:null,
    total: 0,
  };

  constructor(private foodService: FoodService,private authService:AuthService,private userAuthService:UserAuthService) { }

  getCart() {
    return this.cart;
  }

  addToCart(foodId: number, quantity: number) {
    console.log("adding");
    this.foodService.getFood(foodId).subscribe((foodToBeAdded: Food) => {
      const uid = uuid();
      if (this.cart.items == null) {
        this.cart.items = [{ itemId: uid, food: foodToBeAdded, quantity }];
        this.cart.total = foodToBeAdded.price;
       
      } else {
        this.cart.items.push({ itemId: uid, food: foodToBeAdded, quantity });
        this.cart.total += foodToBeAdded.price;
      }
      console.log(this.cart.items);
    });
  }

  removeFromCart(itemId: string) {
    const itemIndex = this.cart.items.findIndex(cartItem => cartItem.itemId === itemId);
    const itemsToBeRemoved = this.cart.items.splice(itemIndex, 1)[0];
    this.cart.total -= itemsToBeRemoved.food.price;

  }
  clearCart(){
    if(this.userAuthService.isAdmin){
      this.cart.items=null;
      this.cart.total=0;
    }
  }
}
