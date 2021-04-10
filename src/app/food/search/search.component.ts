import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/food/food.service';
import { MenuItemsService } from 'src/app/service/menu-items.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private foodService:FoodService,private menuItemService:MenuItemsService) {
    
  }

  ngOnInit() {
  }
  onSearchText(event: any) {
    this.menuItemService.filter.next({ title: event.target.value });
  }
}
