export class CreateOrderDto {
  status: string;
  user_id: string;
  payment_status: string;
  products: { product_id: number; quantity: number }[];
}
