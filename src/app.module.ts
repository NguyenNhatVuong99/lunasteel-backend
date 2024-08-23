import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./modules/products/product.module";
import { RedisCacheModule } from "./modules/redisCache/redis-cache.module";
import { RedisCacheService } from "./modules/redisCache/redis-cache.service";
import { OrderModule } from "./modules/orders/order.module";
const url = "mongodb://localhost:27017";
@Module({
    imports: [
        MongooseModule.forRoot(url, {
            dbName: "lunasteel",
        }),
        RedisCacheModule,
        ProductModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
