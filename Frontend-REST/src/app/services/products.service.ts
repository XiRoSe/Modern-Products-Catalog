import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  postsUrl = 'http://frontend.test.cloudonix.io/items';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer 123'})
  }

  constructor(private http: HttpClient) { }   

  setKey(key:string){
    var text = 'Bearer '+ key;
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': text})
    };
  }

  getProducts(): Observable<Product[]> {
    var prods =this.http.get<Product[]>(this.postsUrl,this.httpOptions);
    return prods;
  }

  removeProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions);
  }

}




// export class PostService {




//   savePost(post: Post): Observable<Post> {
//      return this.http.post<Post>(this.postsUrl, post, httpOptions);
//   }
//   updatePost(post: Post): Observable<Post> {
//     const url = `${this.postsUrl}/${post.id}`;
//     return this.http.put<Post>(url, post, httpOptions);
//   }


// }