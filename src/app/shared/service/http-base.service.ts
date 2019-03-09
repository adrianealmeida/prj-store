import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/product-model';
import '../utils/rxjs-operators';
import { Observable, Subject } from 'rxjs';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public static handleError(error: Response | any): Observable<Response> {
    return Observable.throw(error);
  }

  public getProducts(): Observable<Array<Product>> {
    return this.httpClient
      .get<Product[]>(`${this.API_URL}/produto`)
      .catch(HttpBaseService.handleError)
      .map(this.extractProductList);
  }

  private extractProductList(productList: Product[]): Array<Product> {
    const products: Array<Product> = [];

    let object: any;
    for (object of productList) {
      products.push(Product.fromObject(object));
    }

    return products;
  }

  public updateProduct(product: Product, idProduct: string): Observable<boolean> {
    const url = `${this.API_URL}/produto/${idProduct}`;

    return this.httpClient
      .put(url, product)
      .catch(HttpBaseService.handleError)
      .map((response: Response) => response.ok);
  }

  public deleteProduct(productId: string): Observable<boolean> {
    const url = `${this.API_URL}/produto/${productId}`;
    return this.httpClient
      .delete(url)
      .catch(HttpBaseService.handleError)
      .map((response: Response) => response.ok);
  }

  public registerProduct(product: Product): Observable<boolean> {
    const url = `${this.API_URL}/produto/`;

    return this.httpClient
      .post(url, product)
      .catch(HttpBaseService.handleError)
      .map((response: Response) => response.ok);
  }
}
