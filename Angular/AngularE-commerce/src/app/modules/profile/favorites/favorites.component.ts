import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services/favorites/favorites.service';
import { catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  lang = localStorage.getItem('lang') || 'en';

  isLoading = false;
  id = localStorage.getItem('userId') || '';
  constructor(
    private favoriteService: FavoritesService,
    private router: Router,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getFavProducts();
  }
  getProduct(id: string) {
    this.router.navigate(['/user/product', id]);
  }
  getFavProducts() {
    this.isLoading = true;
    this.favoriteService
      .getUserFavProduct(this.id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((res) => {
        this.favorites = res as any[];
        this.isLoading = false;
      });
  }
  deleteFavPrd(e: Event, prd: string) {
    e.stopPropagation();
    this.favoriteService
      .delFavProduct(this.id, prd)
      .pipe(
        catchError((error) => {
          return of(null);
        })
      )
      .subscribe((res) => {
        this.getFavProducts();
        this.toast.warning({
          detail: 'Favourites',
          summary: 'Product removed from favourites',
          duration: 5000,
          position: 'topRight',
        });
      });
  }
}
