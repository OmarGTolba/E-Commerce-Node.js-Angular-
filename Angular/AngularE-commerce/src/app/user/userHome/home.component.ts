import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private toast: NgToastService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('success')) {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Your payment process succeeded',
        duration: 5000,
        position: 'topRight',
      });
    } else if (this.route.snapshot.queryParamMap.get('canceled')) {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Your payment process failed',
        duration: 5000,
        position: 'topRight',
      });
    }
  }
}
