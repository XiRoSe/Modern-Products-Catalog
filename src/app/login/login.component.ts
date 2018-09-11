import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  redirect = '';

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
  }

  getToken(token: string): void {
    if (typeof token && token !== '') {
      this.redirect = '/items';
      this.productsService.setKey(token);
    } else {
      this.redirect = '/login';
      alert('Empty string is not allowed.');
    }
    this.router.navigate([this.redirect]);
  }
}
