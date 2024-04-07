import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private httpClient: HttpClient) {}
  getUserFavProduct(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/products/favourite/' + id
    );
  }

  AddNewFavProduct(id: string, prdId: string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.post(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/products/favourite/' +
        id +
        '/' +
        prdId,
      { headers }
    );
  }

  delFavProduct(id: string, prdId: string) {
    return this.httpClient.delete(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/products/favourite/' +
        id +
        '/' +
        prdId
    );
  }
}
