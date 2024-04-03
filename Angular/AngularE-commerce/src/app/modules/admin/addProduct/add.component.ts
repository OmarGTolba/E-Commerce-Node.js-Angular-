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
    private productServices: ProductsService
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
    countInStock: 0,
    price: 0,
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
    isFeatured: new FormControl(''),
    descEn: new FormControl(''),
    countInStock: new FormControl(''),
    img1: new FormControl(''),
    img2: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
  });

  addProduct() {
    const url = 'https://ecommerce-node-yxgy.onrender.com/api/v1/products';

    const body = {
      name_en: this.Form.controls.nameEn.value,
      name_ar: this.Form.controls.nameAr.value,
      description_ar: this.Form.controls.descAr.value,
      brand_ar: this.Form.controls.brandAr.value,
      brand_en: this.Form.controls.brandEn.value,
      description_en: this.Form.controls.descEn.value,
      isFeatured: this.Form.controls.isFeatured.value == 'false' ? false : true,
      categories: this.Form.controls.category.value,
      countInStock: this.Form.controls.countInStock.value,
      price: this.Form.controls.price.value,
      images: [this.Form.controls.img1.value, this.Form.controls.img2.value],
    };

    this.http.post<any[]>(url, body, {}).subscribe(
      (response: any) => {},
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  updateProduct() {
    const url = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${this.id}`;

    const body = {
      name_en: this.Form.controls.nameEn.value,
      name_ar: this.Form.controls.nameAr.value,
      description_ar: this.Form.controls.descAr.value,
      brand_ar: this.Form.controls.brandAr.value,
      brand_en: this.Form.controls.brandEn.value,
      isFeatured: this.Form.controls.isFeatured.value == 'false' ? false : true,
      description_en: this.Form.controls.descEn.value,
      categories: this.Form.controls.category.value,
      countInStock: this.Form.controls.countInStock.value,
      price: this.Form.controls.price.value,
      images: [this.Form.controls.img1.value, this.Form.controls.img2.value],
    };

    this.http.patch<any[]>(url, this.formBody, {}).subscribe(
      (response: any) => {},
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
