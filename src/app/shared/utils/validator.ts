/*
 * Copyright (c) 2018
 *
 * OXBIKE, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of OX BIKE and its suppliers, if any.
 * The intellectual and technical concepts contained herein are proprietary to OX BIKE and its suppliers and
 * may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior
 * written permission is obtained from OXBIKE.
 */
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Constants } from './constants';
import { Subscription } from 'rxjs';

export class ValidatorCustom {
  public static validateStartWithBlack(
    control: AbstractControl
  ): ValidationErrors {
    if (control.value && control.value.length > 0 && control.valueChanges) {
      if (control.value[0] === ' ') {
        console.log('control.value:"' + control.value.trim() + '"');
        const valueChangesUn: Subscription = control.valueChanges.subscribe(
          e => {
            control.setValue(control.value.trim(), { emitEvent: false });
            // control.setValue('', { emitEvent: false });
            valueChangesUn.unsubscribe();
          }
        );
      }
    }
    return null;
  }

  public static maxLength(maxLength: number): ValidatorFn {
    return (control: FormControl): { [key: string]: string } => {
      if (control.value && control.value.length > maxLength) {
        control.setValue(control.value.slice(0, maxLength), {
          emitEvent: false
        });
      } else {
        return null;
      }
    };
  }

  public static maxNumber(maxLength: number): ValidatorFn {
    return (control: FormControl): { [key: string]: string } => {
      const maxNumberLeght: string = maxLength + '';
      if (control.value) {
        const valor: string = control.value + '';
        if (valor.length > maxNumberLeght.length || control.value > maxLength) {
          control.setValue(valor.slice(0, maxNumberLeght.length), {
            emitEvent: false
          });
        }
      } else {
        return null;
      }
    };
  }
}
