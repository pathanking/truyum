import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemInfoComponent } from './food/item-info/item-info.component';
import { MenuComponent } from './food/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './food/search/search.component';

import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './shopping/cart/cart.component';
import { HeaderComponent } from './site/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';

import { AuthGuard } from './site/auth/auth.guard';


// export const routes: Routes= [
//   {path: 'menu', component: MenuComponent}
// ];
export const routes: Routes =
 [
  {path: 'menu', component: MenuComponent},
  {path: 'cart', component: CartComponent,canActivate:[AuthGuard]},
  {path: 'item-edit/:id', component: ItemEditComponent }, 
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  { path: '', component: MenuComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ItemInfoComponent,
    MenuComponent,
    SearchComponent,
    CartComponent,
    HeaderComponent,
    ItemEditComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
