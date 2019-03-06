import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/model/product-model';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Constants } from '../shared/utils/constants';
import { ProductNewDialogComponent } from './product-new-dialog/product-new-dialog.component';
import { AppComponent } from '../app.component';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
  }

  /**
   * onRegister
   */
  public onRegister(element: Product): void {
    this.showProductDetailsModal(element);
    // this.appComponent.startLoading();
  }

  /**
   * onEdit
   */
  public onEdit(element: Product): void {
    this.showProductDetailsModal(element);
  }

  /**
   * onDelete
   */
  public onDelete(element: Product): void {
    const deleteDialogRef = this.dialog.open(ConfirmComponent, {
      width: Constants.DELETE_DIALOG_WIDTH,
      id: 'dlgDeleteUser',
      data: {
        title: Constants.PRODUCT_DELETE_DIALOG_TITLE,
        // subtitle: element.name,
        noAction: Constants.NO_ACTION_TXT,
        yesAction: Constants.DELETE_DIALOG_YES_ACTION
      }
    });
    deleteDialogRef.disableClose = false;

    // deleteDialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.deleteUser(element);
    //   }
    // });
  }

  private showProductDetailsModal(
    element: Product,
  ): void {
    const dialogRef = this.dialog.open(ProductNewDialogComponent, {
      width: Constants.PRODUCT_DIALOG_WIDTH,
      height: Constants.PRODUCT_DIALOG_HEIGHT,
      data: {
        appComponent: this.appComponent,
        productRegistered: element,
      }
    });
    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        const config = new MatSnackBarConfig();
        config.panelClass = ['edit-class'];
        config.duration = 4000;
      }
    });
  }

  }

