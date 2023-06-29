export class CreateOrderDto {
  status: string;
  user_id: string;
  products: { product_id: number; quantity: number }[];
}
