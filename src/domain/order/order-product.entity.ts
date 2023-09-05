export class OrderProduct {
  order_id: number;
  quantity: number;
  product_id: number;

  constructor(order_id: number, quantity: number, product_id: number) {
    this.order_id = order_id;
    this.quantity = quantity;
    this.product_id = product_id;
  }
}
