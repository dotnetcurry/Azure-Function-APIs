import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from './../models/app.product.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
   url: string;
   constructor(private http: HttpClient){
     this.url = `https://apihttptrigger.azurewebsites.net/api/products?code=zUsUorALa1BpaiNFNx3lJ1ZSCjbqyZvYPO/msfym0kK7KKHxFXBKgw==&clientId=default`
   }

   getProducts(): Observable<Product[]> {
      let response: Observable<Product[]> = null;
      response = this.http.get<Product[]>('https://apihttptrigger.azurewebsites.net/api/products?code=zUsUorALa1BpaiNFNx3lJ1ZSCjbqyZvYPO/msfym0kK7KKHxFXBKgw==&clientId=default');
      return response;
   }

   getProductById(id: number): Observable<Product> {
    let response: Observable<Product> = null;
    response = this.http.get<Product>(`https://apihttptrigger.azurewebsites.net/api/products?code=zUsUorALa1BpaiNFNx3lJ1ZSCjbqyZvYPO/msfym0kK7KKHxFXBKgw==&clientId=default&id=${id}`);
    return response;
 }

   postProduct(prd: Product): Observable<Product> {
    let response: Observable<Product> = null;
    response = this.http.post<Product>(this.url, prd, {
       headers: new HttpHeaders({
         'Content-Type' : 'application/json'
       })
    });
    return response;
 }
 putProduct(id: number, prd: Product): Observable<Product> {
  let response: Observable<Product> = null;
  response = this.http.put<Product>(`https://apihttptrigger.azurewebsites.net/api/products/${id}?code=zUsUorALa1BpaiNFNx3lJ1ZSCjbqyZvYPO/msfym0kK7KKHxFXBKgw==`, prd, {
     headers: new HttpHeaders({
       'Content-Type' : 'application/json'
     })
  });
  return response;
 }
 deleteProduct(id: number): Observable<string> {
  let response: Observable<string> = null;
  response = this.http.delete<string>(`https://apihttptrigger.azurewebsites.net/api/products/${id}?code=zUsUorALa1BpaiNFNx3lJ1ZSCjbqyZvYPO/msfym0kK7KKHxFXBKgw==`);
  return response;
 }
}
