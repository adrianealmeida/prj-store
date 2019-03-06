import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProductNewDialogComponent } from './product-new-dialog/product-new-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent, ProductNewDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [ProductNewDialogComponent],
})
export class ProductsModule {
}
