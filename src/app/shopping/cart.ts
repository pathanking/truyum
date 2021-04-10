import { Food } from "../food/food";

export interface Cart{
   items?:[{
       itemId:string,
       food:Food,
       quantity?:number
   }];
   menuItemList:Food[];
   total:number;
}