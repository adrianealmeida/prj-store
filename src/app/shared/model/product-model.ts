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

export class Product {
  constructor(
    public name?: string,
    public code?: number,
    public value?: string,
    public quantity?: number,
    public description?: string
  ) {}

  public static fromObject(obj: Object): Product {
    let product: Product;

    product = new Product(
      obj['name'],
      obj['code'],
      obj['value'],
      obj['quantity'],
      obj['description']
    );

    return product;
  }
}
