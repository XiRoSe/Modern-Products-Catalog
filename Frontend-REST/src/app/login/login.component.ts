import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  getToken(token:string):void{
    this.productsService.setKey(token);
  }
}
