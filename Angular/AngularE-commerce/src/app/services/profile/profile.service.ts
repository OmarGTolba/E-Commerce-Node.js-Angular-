import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../Models/userInterface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}
  getUserInfo(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce-nodejs-slwh.onrender.com/api/v1/user/${id}`
    );
  }
  updateProfile(data: IUser): Observable<any> {
    return this.httpClient.patch<IUser>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/user/profile/update',
      data
    );
  }
  forgotPassword(data: { email: string }) {
    return this.httpClient.post<{ email: string }>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/user/password/forgotPassword',
      data
    );
  }
  resetPassword(id: string, token: string, data: { password: string }) {
    return this.httpClient.post<{ password: string }>(
      `https://ecommerce-node-yxgy.onrender.com/api/v1/user/password/reset-password/${id}/${token}`,
      data
    );
  }
}
