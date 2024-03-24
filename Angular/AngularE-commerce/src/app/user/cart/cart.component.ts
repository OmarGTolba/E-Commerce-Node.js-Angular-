import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { catchError, throwError } from 'rxjs';
import { PaymentService } from '../../services/payment/payment.service';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: '../../app.component.css',
})
export class CartComponent implements OnInit{
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private orderService: OrdersService
  ) {
    this.getCart();
  }
  SkeletonLoading=false

  cart: any[] = [];
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  quantity: any = 0;
  show = false;
  userOrder =""
  body={}
  ngOnInit(): void {
    console.log("hello");
    
    console.log(this.token,this.email,this.userId);
    this.orderService.getUserOrders(this.token,this.email,this.userId).subscribe((res)=>{
      
      res.data.forEach((order)=>{
        console.log(order.status);
        
        if(order.status.toLowerCase() == 'pending'){
          this.userOrder = order._id
          console.log(this.userOrder);
          this.body = {
            user: this.userId,
            orderId: this.userOrder,
          };
        }
      })
    })
  }
  total:number = 0;
  getCart() {
    this.SkeletonLoading=true
    this.total = 0
    this.userService
    .getUserCart(this.token, this.email, this.userId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.cart = response?.items;
        console.log(this.cart);
        this.cart.forEach(element => {
          this.total += element.quantity * element.product_id.price;
          this.userService.total = this.total;
          console.log(this.userService.total);
          
          this.SkeletonLoading=false
        });
        // this.cart[0].quantity = this.quantity;
        // console.log(this.cart[0].product_id._id);
      });
      
    }
    pay() {
      this.paymentService
      .showPayment(this.token, this.body)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
        )
        .subscribe({
          next: (response: any) => {
            window.open(response.session.url, '_blank');
          },
          error: (err) => {
            console.error('Payment error:', err);
          },
        });
      }
      plus(i:any){
        console.log(i);
        
        this.updateQuantity(i,++i.quantity)
        console.log(this.userService.total);
  

      }
      
      minus(i:any){
        console.log(i);
        
        this.updateQuantity(i,--i.quantity)
      
        this.userService.total = this.total;
              
      }
      updateQuantity(item: any, newQuantity: number) {
        const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        
        // const updateUrl = `http://localhost:3000/api/v1/cart/${item.product_id.id}`;
        const body = { quantity: newQuantity };
        console.log(item);
        console.log(newQuantity);
        
        this.userService
        .updateUserCart( token,this.email, this.userId, item.product_id._id, body)
        .pipe(
          catchError((error) => {
            return error;
          })
          )
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this.userService.total = this.total;
              console.log(this.userService.total);
              this.getCart()
              console.log(this.total);

            },
            error: (err) => {
              console.error('Payment error:', err);
            }
          });
        }
  
    
    
    makeOrder() {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email') || '';

      // const updateUrl = `http://localhost:3000/api/v1/cart/${item.product_id.id}`;
   const body = 
   {
     city:"Alexandria",
    phone:"01060702328"
  }
  this.userService
      .getUserOrder( token,email, this.userId, body)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response.data._id)
        this.body = {
          user: this.userId,
          orderId: response.data._id,
        };        

      });
  }
  
  
  
  deleteCart(item: any) {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    
    
  console.log(item);
  
  
  this.userService
  .deleteCartItem( token,this.email, this.userId, item.product_id._id)
  .pipe(
      catchError((error) => {
        return error;
      })
      )
      .subscribe((response: any) => {
        console.log(response);
        
        this.getCart()
    });
  }

  
}

