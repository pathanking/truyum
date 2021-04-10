import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';
import { Food } from './food';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  filter = new Subject();
  configUrl = "assets/food-list.json"
  filteredFoods: Food[];
  constructor(private http: HttpClient) { }
  menu: Food []= [{
    id : 1,
      	name : "Sandwich",
      	price : 99,
      active : true,
      	dateOfLaunch : new Date("2017/03/15") , 
      	category : "Main Course",
          freeDelivery: true,
        url:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
        },
        {
          id : 2,
          name : "Burger",
      	price : 129,
      	active : true,
      	dateOfLaunch : new Date("2017/12/23") , 
      	category : "Main Course",
          freeDelivery: false,
          url : "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
          id : 3,
          name : "Pizza",
          price : 149,
      	active : true,
      	dateOfLaunch : new Date("2017/08/07") , 
      	category : "Main Course",
          freeDelivery: false,
          url : "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
        },
        {
          id : 4,
      	name : "French Fries",
      	price : 57,
      	active : false,
      	dateOfLaunch : new Date("2017/07/02") , 
      	category : "Starter",
          freeDelivery: true,
          url : "https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
          id : 5,
      	name : "Chocolate Brownie",
      	price : 32,
      	active : true,
      	dateOfLaunch : new Date("2034/11/02") , 
      	category : "Dessert",
          freeDelivery: true,
          url : "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixfoodId=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80"
        }];
  getFoods(): Observable<any> {
    return this.http.get(this.configUrl);
  }

  getFoodItems(): Food[] {
    // return this.foods;
    this.filteredFoods = this.menu.filter(
      (food: Food) => food.active && food.dateOfLaunch < new Date()
    );
    return this.filteredFoods;
  }
  getFood(id: number): Observable<any> {
    return Observable.create((observer: Observer<Food>) =>{
      this.getFoods().subscribe((foods: Food[]) => {
        const foodItem = foods.find(food => food.id == id);
        observer.next(foodItem);
      });
    });
  }
}
