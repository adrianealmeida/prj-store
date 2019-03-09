import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Constants } from '../../shared/utils/constants';
import { AppComponent } from '../../app.component';
import { ValidatorCustom } from '../../shared/utils/validator';
import { Product } from '../../shared/model/product-model';
import { HttpBaseService } from '../../shared/service/http-base.service';

@Component({
  selector: 'app-product-new-dialog',
  templateUrl: './product-new-dialog.component.html',
  styleUrls: ['./product-new-dialog.component.css']
})
export class ProductNewDialogComponent implements OnInit {
  information: Product;

  constructor(
    private fb: FormBuilder,
    private httpBase: HttpBaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductNewDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.information = data.product;
    this.appComponent = data.appComponent;
  }

  public pageTitle: string = Constants.PRODUCT_TITLE_REGISTER;
  public placeHolderName: string = Constants.PRODUCT_PLACEHOLDER_NAME;
  public placeHolderCode: string = Constants.PRODUCT_PLACEHOLDER_CODE;
  public placeHolderDescription: string =
    Constants.PRODUCT_PLACEHOLDER_DESCRIPTION;
  public placeHolderValue: string = Constants.PRODUCT_PLACEHOLDER_VALUE;
  public placeHolderQuantity: string = Constants.PRODUCT_PLACEHOLDER_QUANTITY;

  public appComponent: AppComponent;

  private reloadData = false;

  public productForm: FormGroup;
  public nome: FormControl;
  public codigo: FormControl;
  public descricao: FormControl;
  public valor: FormControl;
  public quantidade: FormControl;
  public imagem: FormControl;

  public ngOnInit(): void {
    this.nome = new FormControl('', [
      Validators.required,
      Validators.maxLength(Constants.PRODUCT_NAME_MAX_LENGTH),
      ValidatorCustom.validateStartWithBlack
    ]);

    this.codigo = new FormControl('', [
      // Validators.required,
      Validators.maxLength(Constants.PRODUCT_CODE_MAX_LENGTH),
      ValidatorCustom.validateStartWithBlack,
      ValidatorCustom.numericOnly
    ]);

    this.descricao = new FormControl('', [
      // Validators.required,
      Validators.maxLength(Constants.PRODUCT_DESCRIPTION_MAX_LENGTH),
      ValidatorCustom.validateStartWithBlack
    ]);

    this.valor = new FormControl('', [
      // Validators.required,
      Validators.maxLength(Constants.PRODUCT_VALUE_MAX_LENGTH),
      ValidatorCustom.validateStartWithBlack
      // ValidatorCustom.numericOnly
    ]);

    this.quantidade = new FormControl('', [
      // Validators.required,
      Validators.maxLength(Constants.PRODUCT_QUANTITY_MAX_LENGTH),
      ValidatorCustom.validateStartWithBlack,
      ValidatorCustom.numericOnly
    ]);

    this.productForm = new FormGroup({
      _id: new FormControl(this.information.nome ? this.information._id : ''),
      nome: this.nome,
      codigo: this.codigo,
      descricao: this.descricao,
      valor: this.valor,
      quantidade: this.quantidade,
      imagem: new FormControl('')
    });

    this.nome.setValue(this.information.nome);
    this.codigo.setValue(this.information.codigo);
    this.descricao.setValue(this.information.descricao);
    this.valor.setValue(this.information.valor);
    this.quantidade.setValue(this.information.quantidade);

    if (this.productForm.value._id) {
      this.pageTitle = Constants.PRODUCT_TITLE_EDIT;
    } else {
      this.pageTitle = Constants.PRODUCT_TITLE_REGISTER;
    }
  }

  public onSubmit(): void {
    this.appComponent.startLoading();

    if (this.productForm.value._id) {
      this.httpBase
        .updateProduct(this.productForm.value, this.productForm.value._id)
        .subscribe(
          data => {
            console.log('result');
          },
          requestResult => {
            if (requestResult.status === 200) {
              // success
              this.dialogRef.close({
                success: true
                // reloadData: this.reloadData
              });
            } else {
              // failure
              console.log('requestResult');
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
    } else {
      this.registerProduct();
    }
  }

  private registerProduct() {
    this.httpBase.registerProduct(this.productForm.value).subscribe(
      data => {
        console.log('result');
      },
      requestResult => {
        if (requestResult.status === 200) {
          // success
          this.dialogRef.close({
            success: true,
            reloadData: this.reloadData
          });
        } else {
          // failure
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

  /**
   * isDisabled
   */
  public isDisabled(): boolean {
    return !this.productForm.valid;
  }

  /**
   * closeDialog
   */
  public closeDialog(): void {
    this.dialogRef.close({ success: false });
  }
}
