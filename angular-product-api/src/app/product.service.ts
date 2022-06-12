import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  loadProuctDetails():Observable<Product[]>{
    return this.http.get<Product[]>('http://34.204.67.161:3000/allProducts');
  }

  //http://localhost:3000/saveProduct
  storeProduct(product: Product): Observable<any>{
    return this.http.post("http://34.204.67.161:3000/saveProduct", product)
  }

  deleteProduct(pid: number): Observable<any>{
    return this.http.delete(`http://34.204.67.161:3000/deleteProduct/${pid}`);
  }

  updateProduct(product: Product): Observable<any>{
    return this.http.put("http://34.204.67.161:3000/updateProduct", product)
  }

  updateProductPrice(product: any): Observable<any>{
    return this.http.patch("http://34.204.67.161:3000/updateProduct", product);
  }
}
