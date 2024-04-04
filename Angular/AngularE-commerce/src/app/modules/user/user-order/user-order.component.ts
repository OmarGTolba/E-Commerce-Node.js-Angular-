import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../services/orders/orders.service';
import { UserService } from '../../../services/user/user.service';
import { catchError } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css',
})
export class UserOrderComponent {
  orderId: string = '';
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderServices: OrdersService
  ) {}
  imgsrc: string = 'https://i.imgur.com/TAzli1U.jpg';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['orderId'];
    });
    this.orderServices
      .getOrderByID(this.orderId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        
        this.order = response.data;
        this.imgsrc = this.order?.orderItemsIds[0].product.images[0];
        console.log(this.order);
      });
  }
  changeImg(i: string) {
    this.imgsrc = i;
  }
}
