import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Exchange, ExchangeSchema } from "../exchange.schema";
import { SpecialDiscountPrice, SpecialDiscountPriceSchema } from "./special-discount-price";
import { SpecialRebateOffer, SpecialRebateOfferSchema } from "./special-rebate-offer";

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class OrderDetail extends Document {
    @Prop({ required: true })
    orderId: string;

    @Prop({ required: true })
    coilId: string;

    @Prop({ type: [String], default: [] })
    prices: string[];

    @Prop({ type: SpecialDiscountPriceSchema, required: false })
    specialDiscountPrice: SpecialDiscountPrice;

    @Prop({ type: SpecialRebateOfferSchema, required: false })
    specialRebateOffer: SpecialRebateOffer;

    @Prop({ type: ExchangeSchema, required: false })
    exchange: Exchange;

    @Prop({ required: true })
    finalPrice: number;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({ required: true, default: false })
    isDeleted: boolean;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
