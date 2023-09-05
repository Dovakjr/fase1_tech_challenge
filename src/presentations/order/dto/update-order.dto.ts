import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  status: string;
  user_id: string;
  payment_status: string;
  products: { product_id: number; quantity: number }[];
}
