import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Constants } from '../../shared/utils/constants';
import { AppComponent } from '../../app.component';
import { ValidatorCustom } from '../../shared/utils/validator';

@Component({
  selector: 'app-product-new-dialog',
  templateUrl: './product-new-dialog.component.html',
  styleUrls: ['./product-new-dialog.component.css']
})
export class ProductNewDialogComponent implements OnInit {
  // productForm;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductNewDialogComponent>) { }

    public pageTitle: string = Constants.PRODUCT_TITLE_REGISTER;
    public placeHolderName: string = Constants.PRODUCT_PLACEHOLDER_NAME;
    public placeHolderCode: string = Constants.PRODUCT_PLACEHOLDER_CODE;
    public placeHolderDescription: string = Constants.PRODUCT_PLACEHOLDER_DESCRIPTION;
    public placeHolderValue: string = Constants.PRODUCT_PLACEHOLDER_VALUE;
    public placeHolderQuantity: string = Constants.PRODUCT_PLACEHOLDER_QUANTITY;

    public appComponent: AppComponent;

    public productForm: FormGroup;
    public name: FormControl;
    public code: FormControl;
    public description: FormControl;
    public value: FormControl;
    public quantity: FormControl;

    ngOnInit() {
      this.productForm = this.fb.group({
        name: [''],
        code: [],
        description: [''],
        quantity: [],
        value: []
      });
      this.name = new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.PRODUCT_NAME_MAX_LENGTH),
        ValidatorCustom.validateStartWithBlack
      ]);

      this.code = new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.PRODUCT_CODE_MAX_LENGTH),
        ValidatorCustom.validateStartWithBlack
      ]);

      this.description = new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.PRODUCT_DESCRIPTION_MAX_LENGTH),
        ValidatorCustom.validateStartWithBlack
      ]);

      this.value = new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.PRODUCT_VALUE_MAX_LENGTH),
        ValidatorCustom.validateStartWithBlack
      ]);

      this.quantity = new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.PRODUCT_QUANTITY_MAX_LENGTH),
        ValidatorCustom.validateStartWithBlack
      ]);
  }

  onSubmit() {
    console.log(this.productForm.controls);
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
