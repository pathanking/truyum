import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './food/menu/menu.component';
import { CartComponent } from './shopping/cart/cart.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';
import { AuthGuard } from './site/auth/auth.guard';


const routes: Routes =
 [
  // {path: 'menu', component: MenuComponent},
  // {path: 'cart', component: CartComponent },
  // {path: 'item-edit/:id', component: ItemEditComponent }, 
  // {path: 'login', component: LoginComponent },
  // {path: 'signup', component: SignupComponent },
  // { path: '', component: MenuComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
