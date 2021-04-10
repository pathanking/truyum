import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from './cart.service';
import { MenuItemsService } from 'src/app/service/menu-items.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  isEmpty=true;
  error=null;

  removeCart = false;
  constructor(private cartService: CartService, private menuItemService: MenuItemsService,private userAuthService:UserAuthService) {
    // this.cart = this.cartService.getCart();
    this.menuItemService.getAllCartItems(this.userAuthService.getUsername()).subscribe(data => {
      console.log(data);
      this.cart = data;
      this.isEmpty = false;
    },
      error => {
        console.log(error.error.message);
        if (error.status == 404) {
          this.isEmpty = true;
        }
      })

  }



  // onRemoveItem(itemId: string) {
  //   this.cartService.removeFromCart(itemId);
  //   this.cartService.getCart();
  //   this.removeCart=true;
  //   setTimeout(() => {
  //     this.removeCart=false;
  //   }, 1000);return false;
  // }
  onRemoveItem(itemId: number) {
    this.menuItemService.removeCartItem(this.userAuthService.getUsername(),itemId).subscribe(cart =>
      this.menuItemService.getAllCartItems(this.userAuthService.getUsername()).subscribe(
        cart => {
          
            console.log(cart);
            this.cart = cart;
            this.removeCart = true;
            this.isEmpty = false;
            setTimeout(() => {
              this.removeCart = false;

            }, 1000); return false;
          
        },
        (error) => {
          console.log(error.error.message);
          this.isEmpty = true;
          this.error = error.error.message;
        }

      )
    );

  }
  ngOnInit() {
    // this.menuItemService.getAllCartItems(this.userAuthService.getUsername()).subscribe((cart) => {
    //   console.log(cart);
    //   this.cart = cart;
    // })
  }

}
