import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';
import { AboutModule } from './about/about.module';
import { MaterialModule } from './shared/material/material.module';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ConfirmComponent } from './shared/components/confirm/confirm.component';
import { ProductService } from './service/product.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HomeModule,
    ProductsModule,
    AboutModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    ConfirmComponent,
    LoadingComponent
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
