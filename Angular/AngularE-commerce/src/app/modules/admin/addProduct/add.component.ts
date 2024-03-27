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

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
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
          .getProductsByID(this.token, this.email, id!)
          .pipe(
            catchError((error) => {
              return error;
            })
          )
          .subscribe((response: any) => {
            console.log(response.data);
            this.product = response.data;
            this.formBody.brandAr = this.product.brand_ar;
            this.formBody.brandEn = this.product.brand_en;
            this.formBody.descAr = this.product.description_ar;
            this.formBody.descEn = this.product.description_en;
            this.formBody.countInStock = this.product.countInStock;
            this.formBody.category = this.product.categories._id;
            this.formBody.price = this.product.price;
            this.formBody.nameAr = this.product.name_ar;
            this.formBody.nameEn = this.product.name_en;
            this.formBody.isFeatured = this.product.isFeatured;
          });
      } else {
        console.log('bbbba');
      }
    });
  }

  formBody = {
    nameAr: '',
    nameEn: '',
    brandEn: '',
    category: '',
    brandAr: '',
    descAr: '',
    descEn: '',
    countInStock: '',
    price: '',
    image: '',
    isFeatured: '',
  };

  Form = new FormGroup({
    nameAr: new FormControl(''),
    nameEn: new FormControl(''),
    brandEn: new FormControl(''),
    category: new FormControl(''),
    brandAr: new FormControl(''),
    descAr: new FormControl(''),
    descEn: new FormControl(''),
    countInStock: new FormControl(''),
    images: new FormGroup({
      img1: new FormControl(''),
      img2: new FormControl(''),
      img3: new FormControl(''),
    }),
    price: new FormControl(''),
    image: new FormControl(''),
  });

  addProduct() {
    console.log(this.Form.controls.brandAr);
    const url = 'http://localhost:3000/api/v1/products';
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    const body = {
      name_en: this.Form.controls.nameEn.value,
      name_ar: this.Form.controls.nameAr.value,
      description_ar: this.Form.controls.descAr.value,
      brand_ar: this.Form.controls.descAr.value,
      brand_en: this.Form.controls.brandAr.value,
      description_en: this.Form.controls.brandEn.value,
      categories: this.Form.controls.category.value,
      countInStock: this.Form.controls.countInStock.value,
      price: this.Form.controls.price.value,
      images: [],
    };
    console.log(body);

    this.http
      .post<any[]>(url, body, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          jwt: token,
          email: email,
        },
      })
      .subscribe(
        (response: any) => {
          //   console.log(response);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }

  updateProduct() {
    console.log(this.Form.controls.brandAr);
    const url = `http://localhost:3000/api/v1/products/${this.id}`;
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    const body = {
      name_en: this.Form.controls.nameEn.value,
      name_ar: this.Form.controls.nameAr.value,
      description_ar: this.Form.controls.descAr.value,
      brand_ar: this.Form.controls.descAr.value,
      brand_en: this.Form.controls.brandAr.value,
      description_en: this.Form.controls.brandEn.value,
      // categories:this.Form.controls.category.value,
      countInStock: this.Form.controls.countInStock.value,
      price: this.Form.controls.price.value,
      images: [],
    };
    console.log(body);

    this.http
      .patch<any[]>(url, body, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          jwt: token,
          email: email,
        },
      })
      .subscribe(
        (response: any) => {
          console.log('done');
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }
}
