import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Import nested schemas
import { Extend, ExtendSchema } from './extend.schema';
import { Offer, OfferSchema } from './offer.schema';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class OrderProgress extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ type: ExtendSchema, required: true })
    extend: Extend;

    @Prop({ type: OfferSchema, required: true })
    offer: Offer;

    @Prop({ required: true, default: false })
    isDeleted: boolean;
}

export const OrderProgressSchema = SchemaFactory.createForClass(OrderProgress);
