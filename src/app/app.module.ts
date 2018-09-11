import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';
import { AppRoutingModule } from './/app-routing.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
