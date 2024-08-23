import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { OrderService } from './order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() body: any) {
    return this.orderService.create(body);
  }

 
}
