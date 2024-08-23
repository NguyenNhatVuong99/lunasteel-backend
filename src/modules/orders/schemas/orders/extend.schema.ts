import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Extend schema as a nested schema
@Schema()
export class Extend extends Document {
    @Prop({ required: true })
    note: string;

    @Prop({ required: true })
    validityTime: Date;

    @Prop({ required: true })
    isRejected: boolean;
}

export const ExtendSchema = SchemaFactory.createForClass(Extend);
