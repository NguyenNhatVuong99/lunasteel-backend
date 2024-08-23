import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Exchange extends Document {
    @Prop({ required: true })
    exchangeRateId: string;

    @Prop({ required: true })
    rate: number;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);