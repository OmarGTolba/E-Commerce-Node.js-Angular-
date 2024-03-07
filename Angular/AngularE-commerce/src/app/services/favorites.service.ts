import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private httpClient: HttpClient) {}
  getUserFavProduct(id: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: localStorage.getItem('token') || '',
    });
    return this.httpClient.get<any[]>(
      'http://localhost:3000/api/v1/products/favourite/' + id
    );
  }

  AddNewFavProduct(id: string, prdId: string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: localStorage.getItem('token') || '',
    });
    return this.httpClient.post(
      'http://localhost:3000/api/v1/products/favourite/' + id + '/' + prdId,
      { headers }
    );
  }

  delFavProduct(id:string, prdId:string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: localStorage.getItem('token') || '',
    });
    return this.httpClient.delete(
      'http://localhost:3000/api/v1/products/favourite/' + id + '/' + prdId,
      { headers }
    );
  }
}
