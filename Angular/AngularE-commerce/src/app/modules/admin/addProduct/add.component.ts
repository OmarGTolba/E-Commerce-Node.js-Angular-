import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { catchError } from 'rxjs';
import { Product } from '../../../Models/products';
import { NgToastService } from 'ng-angular-popup';
import { error } from 'console';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  userId = localStorage.getItem('userId') || '';
  editMode: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private productServices: ProductsService,
    private toast: NgToastService
  ) {}
  id: any = '';
  product: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const id = params.get('id');
        this.editMode = true;
        this.id = params.get('id');
        this.productServices
          .getProductsByID(id!)
          .pipe(
            catchError((error) => {
              return error;
            })
          )
          .subscribe((response: any) => {
            this.product = response.data;
            this.formBody.brand_ar = this.product.brand_ar;
            this.formBody.brand_en = this.product.brand_en;
            this.formBody.description_ar = this.product.description_ar;
            this.formBody.description_en = this.product.description_en;
            this.formBody.countInStock = this.product.countInStock;
            this.formBody.categories = this.product.categories._id;
            this.formBody.price = this.product.price;
            this.formBody.name_ar = this.product.name_ar;
            this.formBody.name_en = this.product.name_en;
            this.formBody.isFeatured = this.product.isFeatured;
            this.formBody.images = this.product.images;
          });
      } else {
      }
    });
  }

  formBody: Product = {
    name_ar: '',
    name_en: '',
    brand_en: '',
    categories: '',
    brand_ar: '',
    description_ar: '',
    description_en: '',
    countInStock: '',
    price: '',
    images: [],
    isFeatured: false,
  };

  Form = new FormGroup({
    nameAr: new FormControl(''),
    nameEn: new FormControl(''),
    brandEn: new FormControl(''),
    category: new FormControl(''),
    brandAr: new FormControl(''),
    descAr: new FormControl(''),
    isFeatured: new FormControl('false'),
    descEn: new FormControl(''),
    countInStock: new FormControl(''),
    price: new FormControl(''),
    images: new FormControl([]),
  });
  handleChange(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.formBody.images = Array.from(inputElement.files);
    }
  }
  addProduct() {
    const url = 'https://ecommerce-node-yxgy.onrender.com/api/v1/products';

    const formData = new FormData();
    formData.append('name_ar', this.Form.get('nameAr')?.value || '');
    formData.append('name_en', this.Form.get('nameEn')?.value || '');
    formData.append('brand_en', this.Form.get('brandEn')?.value || '');
    formData.append('brand_ar', this.Form.get('brandAr')?.value || '');
    formData.append('categories', this.Form.get('category')?.value || '');
    formData.append('description_en', this.Form.get('descEn')?.value || '');
    formData.append('description_ar', this.Form.get('descAr')?.value || '');
    formData.append(
      'isFeatured',
      this.Form.get('isFeatured')?.value || 'false'
    );
    formData.append('countInStock', this.Form.get('countInStock')?.value || '');
    formData.append('price', this.Form.get('price')?.value || '');

    for (let i = 0; i < this.formBody.images.length; i++) {
      formData.append('images', this.formBody.images[i]);
    }
    this.http.post<any[]>(url, formData).subscribe({
      next: () => {
        this.toast.success({
          detail: 'Success',
          summary: 'Product added successfully',
          duration: 5000,
          position: 'topRight',
        });
        this.formBody = {
          name_ar: '',
          name_en: '',
          brand_en: '',
          categories: '',
          brand_ar: '',
          description_ar: '',
          description_en: '',
          countInStock: '',
          price: '',
          images: [],
          isFeatured: false,
        };
        this.Form.markAsPristine();
        this.Form.markAsUntouched();
      },
    });
  }

  updateProduct() {
    const url = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${this.id}`;

    const formData = new FormData();
    formData.append('name_ar', this.Form.get('nameAr')?.value || '');
    formData.append('name_en', this.Form.get('nameEn')?.value || '');
    formData.append('brand_en', this.Form.get('brandEn')?.value || '');
    formData.append('brand_ar', this.Form.get('brandAr')?.value || '');
    formData.append('categories', this.Form.get('category')?.value || '');
    formData.append('description_en', this.Form.get('descEn')?.value || '');
    formData.append('description_ar', this.Form.get('descAr')?.value || '');
    formData.append(
      'isFeatured',
      this.Form.get('isFeatured')?.value || 'false'
    );
    formData.append('countInStock', this.Form.get('countInStock')?.value || '');
    formData.append('price', this.Form.get('price')?.value || '0');

    for (let i = 0; i < this.formBody.images.length; i++) {
      formData.append('images', this.formBody.images[i]);
    }

    this.http.patch<any[]>(url, formData, {}).subscribe({
      next: () => {
        this.toast.success({
          detail: 'Success',
          summary: 'Product updated successfully',
          duration: 5000,
          position: 'topRight',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
