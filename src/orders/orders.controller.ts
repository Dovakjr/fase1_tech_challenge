import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findByPk(id);
  }

  @Get('111111111111111')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get()
  findAllWhitProducts() {
    return this.ordersService.findAllWhitProducts();
  }
}
