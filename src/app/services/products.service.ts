import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  productsUrl = 'http://frontend.test.cloudonix.io/items';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router) { }

  setKey(token: string) {
    const text = 'Bearer ' + token;
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': text})
    };
  }

  getProducts(): Observable<Product[]> {
    const prods = this.http.get<Product[]>(this.productsUrl, this.httpOptions);
    // routing back to login page in case auth' has not been done correctly
    if (this.httpOptions.headers.keys().length < 2) {
        this.router.navigate(['/login']);
    }

    return prods;
  }

  removeProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions);
  }

  updateProduct(product: Product, pName: string, description: string, cost: number): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;
    const edited = JSON.stringify({'name': pName, 'description': description, 'cost': cost});
    return this.http.patch<Product>(url, edited , this.httpOptions);
  }

}




// export class PostService {




//   savePost(post: Post): Observable<Post> {
//      return this.http.post<Post>(this.productsUrl, post, httpOptions);
//   }


// }
