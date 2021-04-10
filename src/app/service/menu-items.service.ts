import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Food } from "../food/food";
import { AuthenticationService } from "../site/login/authentication.service";
import { environment } from "src/environments/environment";
import { UserAuthService } from "./user-auth.service";
import { Cart } from "../shopping/cart";
@Injectable({
  providedIn: "root",
})
export class MenuItemsService {
  filter = new Subject();
  constructor(
    private _httpClient: HttpClient,
    private userAuthService: UserAuthService,
    private authenticationService: AuthenticationService
  ) {}
  baseUrl = environment.baseUrl;

  public getAllMenuItems(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + this.userAuthService.getToken(),
      }),
    };
    return this._httpClient.get<Food[]>(
      this.baseUrl + "/menu-items",
      httpOptions
    );
  }
  public getMenuItem(id: number): Observable<Food> {
    const httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + this.userAuthService.getToken(),
      }),
    };
    return this._httpClient.get<Food>(
      this.baseUrl + "/menu-items/" + id,
      httpOptions
    );
  }
  public modifyMenuItem(menuItem: Food) {
    const httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + this.userAuthService.getToken(),
      }),
    };
    console.log(menuItem);
    return this._httpClient.put(
      this.baseUrl + "/menu-items/",
      menuItem,
      httpOptions
    );
  }
  public addCartItem(user: string, menuItemId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + this.userAuthService.getToken(),
      }),
    };
    console.log("TOKEN FROM ADD CART" + this.userAuthService.getToken());
    console.log("FROM menuitems service add to cart" + user + " " + menuItemId);
    return this._httpClient.post(
      this.baseUrl + "/carts/" + user + "/" + menuItemId,
      {},
      httpOptions
    );
  }
  public getAllCartItems(user: string) {
    // let user=this.userAuthService.getUsername();
    const httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + this.userAuthService.getToken(),
      }),
    };
    return this._httpClient.get<Cart>(
      this.baseUrl + "/carts/" + user,
      httpOptions
    );
  }
  removeCartItem(user: string, menuItemId: number) {
    // let user=this.userAuthService.getUsername();

    const httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + this.userAuthService.getToken(),
      }),
    };
    console.log("TOKEN FROM GET CART -> " + this.userAuthService.getToken());
    console.log("FROM MENUITEM SERVICE GETTING CART -> " + user);
    return this._httpClient.delete(
      this.baseUrl + "/carts/" + user + "/" + menuItemId,
      httpOptions
    );
  }
}
