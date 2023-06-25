export class CreateOrderDto {
  status: string;
  user_id: string;
  products: { id: number; quantity: number }[];
}
