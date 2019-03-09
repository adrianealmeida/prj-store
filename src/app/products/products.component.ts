import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/model/product-model';
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarConfig,
  MatTableDataSource
} from '@angular/material';
import { Constants } from '../shared/utils/constants';
import { ProductNewDialogComponent } from './product-new-dialog/product-new-dialog.component';
import { AppComponent } from '../app.component';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { HttpBaseService } from '../shared/service/http-base.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public allProducts: Array<Product>;
  public filteredProducts: Array<Product>;
  public products: Array<Product>;

  public noProductFound: string = Constants.PRODUCT_NO_REGISTERED_DATA;
  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private appComponent: AppComponent,
    private httpBase: HttpBaseService,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.allProducts = [];
    this.filteredProducts = [];
    this.products = [];
  }

  public ngOnInit(): void {
    this.getAllProducts();

    this.subscription = this.productService.subject$.subscribe(search => {
      this.filteredProducts = this.allProducts.filter((product: Product) => {
        return (
          product.nome.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          product.descricao.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });

      this.updateProducts();
    });
  }

  public onRegister(): void {
    this.showProductDetailsModal();
  }

  public onEdit(element: Product): void {
    this.showProductDetailsModal(element);
  }

  public onDelete(element: Product): void {
    const deleteDialogRef = this.dialog.open(ConfirmComponent, {
      width: Constants.DELETE_DIALOG_WIDTH,
      id: 'dlgDeleteProduct',
      data: {
        title: Constants.PRODUCT_DELETE_DIALOG_TITLE,
        subtitle: element.nome,
        noAction: Constants.NO_ACTION_TXT,
        yesAction: Constants.DELETE_DIALOG_YES_ACTION
      }
    });
    deleteDialogRef.disableClose = false;

    deleteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(element);
      }
    });
  }

  private showProductDetailsModal(element: Product = new Product()): void {
    const dialogRef = this.dialog.open(ProductNewDialogComponent, {
      width: Constants.PRODUCT_DIALOG_WIDTH,
      height: Constants.PRODUCT_DIALOG_HEIGHT,
      data: {
        appComponent: this.appComponent,
        product: element
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
    });
  }

  public getAllProducts(showLoading: boolean = true): void {
    this.productService.clearSearchData();

    if (showLoading) {
      this.appComponent.startLoading();
    }

    this.httpBase.getProducts().subscribe(
      data => {
        this.products = data;
        this.allProducts = data;
        this.filteredProducts = data;

        this.updateProducts();
      },
      requestResult => {

        if (requestResult.status === 200) {
          // success
        } else {
          // failure
          console.error(requestResult);
          this.snackBar.open(requestResult.error, 'OK', {
            duration: 3000
          });
        }
        this.appComponent.stopLoading();
      },
      () => {
        this.appComponent.stopLoading();
      }
    );
  }

  private updateProducts(): void {
    this.products = this.filteredProducts;
  }

  private deleteProduct(data: Product): void {
    this.appComponent.startLoading();
    this.httpBase.deleteProduct(data._id).subscribe(
      response => {
        this.appComponent.stopLoading();
      },
      requestResult => {

        if (requestResult.status === 200) {
          // success
        } else {
          // failure
          console.error(requestResult);
          this.snackBar.open(requestResult.error, 'OK', {
            duration: 3000
          });
        }
        this.appComponent.stopLoading();
        this.getAllProducts(false);
      },
      () => {
        this.appComponent.stopLoading();
      }
    );
  }
}
