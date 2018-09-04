import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products = [];
    this.productsService.getProducts().subscribe(products =>{
      products.forEach(prod=>{
        if(prod != null){
          this.products.push(prod);
        }
      })
    })
  }

  removeProduct(product: Product) {
    if (confirm('Are you sure?')) {
      this.productsService.removeProduct(product.id).subscribe(() => {
        this.products.forEach((cur, index) => {
          if (product.id == cur.id) {
            this.products.splice(index, 1);
          }
        });
      });
    }
  }
  
}
