import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Offer extends Document {
    @Prop({ required: true })
    note: string;

    @Prop({ type: [String], default: [] })
    file: string[];
}

export const OfferSchema = SchemaFactory.createForClass(Offer);