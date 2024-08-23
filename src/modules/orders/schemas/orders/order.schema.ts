import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderProgress } from "./order-progress.schema";
import { OrderOffer } from "./order-offer.schema";
import { Document } from "mongoose";

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class IsReject extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    status: boolean;
}

@Schema({ timestamps: true })
export class Order extends Document {
    @Prop({ required: true })
    ticketId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    customerId: string;

    @Prop({ type: [OrderProgress], default: [] })
    orderProgresses: OrderProgress[];

    @Prop({ required: true, enum: ['STANDARDS', 'NONE STANDARDS', 'CLEARANCES'] })
    properties: 'STANDARDS' | 'NONE STANDARDS' | 'CLEARANCES';

    @Prop({ required: false, default:'PENDING', enum: ['PENDING', 'NOT ENOUGH INVENTORY', 'DENIED', 'OUT OF STOCK'] })
    status: 'PENDING' | 'NOT ENOUGH INVENTORY' | 'DENIED' | 'OUT OF STOCK';

    @Prop({ required: true, type: Number })
    totalPrice: number;

    @Prop({ type: [String], default: [] })
    tax: string[]; // Array of tax_id

    @Prop({ required: true, type: Number })
    finalPrice: number;

    @Prop({ type: [OrderOffer], default: [] })
    orderOffers: OrderOffer[];

    @Prop({ type: IsReject, required: false })
    isReject: IsReject;

    @Prop({ required: true, default: false })
    isDraft: boolean;

    @Prop({ required: true, default: false })
    isSubmit: boolean;

    @Prop({ required: true, default: false })
    isDeleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
