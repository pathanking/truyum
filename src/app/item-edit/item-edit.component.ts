import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { FoodService } from '../food/food.service';

import { MenuItemsService } from '../service/menu-items.service';
import { Food } from '../food/food';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  editForm: FormGroup;
  error:string;
  foodEdited = false;
  saved=false;
  categories:string[];
  constructor(private foodService: FoodService, private route: ActivatedRoute, private router: Router,private menuItemService:MenuItemsService) { }
  ngOnInit() {
    this.editForm = new FormGroup({
      'id':new FormControl(null),
      'name': new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      'url': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      'category': new FormControl(null, Validators.required),
      'dateOfLaunch': new FormControl(null),
      'active': new FormControl(null, Validators.required),
      'freeDelivery': new FormControl(null)
    });
    this.categories=[
      'Main Course','Starter','Dessert'
    ]
    this.route.params.subscribe((params: Params) => {
      const foodId = params['id'];
      // this.foodService.getFood(foodId).subscribe((food: Food) => {
      //   if (food) {
      //     this.editForm.patchValue({
      //       title: food.name,
      //       imageUrl: food.url,
      //       price: food.price,
      //       category: food.category,
      //       dateOfLaunch: food.dateOfLaunch,
      //       isActive: food.isActive? "Yes" : "No" ,
      //       isDeliveryFree: food.isDeliveryFree
      //     });
      //   } else {
      //     this.router.navigate(['not-found']);
      //   }
      // });
    this.menuItemService.getMenuItem(foodId).subscribe((food:Food)=>{
      if (food) {
            this.editForm.patchValue({
              
              id:foodId,
              name: food.name,
              url: food.url,
              price:food.price,
              category: food.category,
              dateOfLaunch:food.dateOfLaunch,
              active: food.active,
              freeDelivery: food.freeDelivery
            });
          } else {
            this.router.navigate(['not-found']);
          }
    });
    });
  }
  onSubmitEditForm() {
    console.log(this.editForm);
    this.foodEdited = true;
    this.menuItemService.modifyMenuItem(this.editForm.value)
  }
  onSaveClick(editForm:Form){
    this.menuItemService.modifyMenuItem(this.editForm.value).subscribe(data=>{
      console.log("Food item saved successfully");
      console.log(this.editForm.value);
      this.saved = true;
      this.error='';
    },
    error => {
      console.log(error);
      this.error = error.error.message;
      if (error.error.errors != null) {
        this.error = error.error.errors[0];
      }
    });
  }

}
