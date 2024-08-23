import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class SpecialRebateOffer extends Document {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    value: number;
}

export const SpecialRebateOfferSchema = SchemaFactory.createForClass(SpecialRebateOffer);
