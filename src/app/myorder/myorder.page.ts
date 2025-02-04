import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { OrderApiService } from 'src/app/services/order-api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
})
export class MyorderPage implements OnInit {

  orderProducts: any[] = [];
  shipping:number = 3;
  total: number = 0;
  grandTotal:number = 3;
  totalAddedQuanty:number = 0;
  orders:any[] = [];
  cartProducts: any[] = [];
 

  constructor(private router:Router,
              private orderService: OrderService,
              private cartService: CartService, 
              private orderApi: OrderApiService,
              private auth: AuthorizationService
             ) { }

             ngOnInit(): void {
              this.orderApi.getOrders().subscribe( (res:any)=>{
                   let arr:any[] = res.data;
                   console.log(arr);
                   for(let order of arr){
                        if( order.userID == this.auth.getUserPayload().sub  ){
                           this.orders.push( order);
                        }
                   }
                   this.cartService.getCartProducts().subscribe(  (cartProducts)=>{
                    this.cartService.getCartProducts().subscribe(  (res:any)=>{
                         this.cartProducts = res.data;
                         for( let cp of this.cartProducts){
                             if( cp.userID == this.auth.getUserPayload().sub){
                                this.totalAddedQuanty +=  +cp.quantity;
                             }
                         }    
                    })
                  })
              })
       
          
         }

         onCart(){
          this.router.navigate(['/cart']);
        }

}
