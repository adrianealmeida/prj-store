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
    public nome?: string,
    public codigo?: number,
    public valor?: string,
    public quantidade?: number,
    public descricao?: string,
    public _id?: string,
    public imagem?: string
  ) {}

  public static fromObject(obj: Object): Product {
    let product: Product;

    product = new Product(
      obj['nome'],
      obj['codigo'],
      obj['valor'],
      obj['quantidade'],
      obj['descricao'],
      obj['_id'],
      obj['image']
    );

    return product;
  }
}
