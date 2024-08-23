import { Module } from '@nestjs/common';
import { OrdersController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/orders/order.schema';
import { OrderService } from './order.service';
import { OrderOffer, OrderOfferSchema } from './schemas/orders/order-offer.schema';
import { OrderDetail, OrderDetailSchema } from './schemas/order-details/order-detail.schema';
import { ProductPlan, ProductPlanSchema } from './schemas/order-details/product-plan.schema';
import { DeliveryPlan, DeliveryPlanSchema } from './schemas/order-details/delivery-plan.schema';
import { PaymentPlan, PaymentPlanSchema } from './schemas/orders/payment-plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderOffer.name, schema: OrderOfferSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: ProductPlan.name, schema: ProductPlanSchema },
      { name: DeliveryPlan.name, schema: DeliveryPlanSchema },
      { name: PaymentPlan.name, schema: PaymentPlanSchema },
    ]),
  ],

  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrderModule { }
