import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the OrderOffer schema
@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class OrderOffer extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    note: string;

    @Prop({ required: true })
    reply: string;

    @Prop({ type: [String], default: [] })
    file: string[];

    @Prop({ required: true, default: false })
    isAproval: boolean;

    @Prop({ required: true, default: false })
    isDeleted: boolean;
}

// Create the schema
export const OrderOfferSchema = SchemaFactory.createForClass(OrderOffer);
