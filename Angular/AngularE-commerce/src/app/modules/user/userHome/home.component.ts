import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { catchError } from 'rxjs';
import { AppModule } from '../../../app.module';
import { ProductCardComponent } from '../product-card/product-card.component';
import { LanguageService } from '../../../services/language/language.service';
import { UserService } from '../../../services/user/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class HomeComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: any[] = [];
  categories: any[] = [];
  displayedProducts: any;

  productSkeletonLoading = false;
  catSkeletonLoading = false;

  lang = localStorage.getItem('lang') || 'en';
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  constructor(
    private productService: ProductsService,
    private langService: LanguageService,
    private userService: UserService
  ) {
    this.getAllProducts();
    this.getAllCategories();
    this.langService.getLang().subscribe((lang) => {
      this.lang = lang;
    });

    localStorage.setItem('mode', `false`);

    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }

  darkmode: boolean = false;
  toggle() {
    let mode = localStorage.getItem('mode');
    if (mode == 'false') {
      mode = 'true';
    } else {
      mode = 'false';
    }

    localStorage.setItem('mode', `${mode}`);
    if (localStorage.getItem('mode') == 'true') {
      document.body.style.backgroundColor = 'black';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }

  getAllProducts(): void {
    this.productSkeletonLoading = true;
    this.productService
      .getAllProducts()
      .pipe((error) => {
        return error;
      })
      .subscribe((response: any) => {
        this.products = response.data;
        this.displayedProducts = this.products.slice(0, 3);
        this.productSkeletonLoading = false;
      });
  }

  getAllCategories() {
    this.catSkeletonLoading = true;
    this.productService
      .getAllCategories()
      .pipe((error) => {
        return error;
      })
      .subscribe((response: any) => {
        this.categories = response.data;

        this.categories = this.categories.slice(0, 3);
        this.catSkeletonLoading = false;
      });
  }

  darkMode: boolean = false;

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }
}
