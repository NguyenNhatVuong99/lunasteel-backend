import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Schedule schema as a nested schema
@Schema()
export class Schedule extends Document {
    @Prop({ required: true })
    paymentDate: Date;

    @Prop({ required: true })
    paymentAmount: number;

    @Prop({ required: true })
    paymentType: string;

    @Prop({ required: false, default: false })
    isPaided: boolean;
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

// Define the Plan schema as a nested schema
@Schema()
export class Plan extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    paymentTerm: string;

    @Prop({ type: [ScheduleSchema], required: true })
    schedules: Schedule[];
}

const PlanSchema = SchemaFactory.createForClass(Plan);

// Define the PaymentPlan schema
@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class PaymentPlan extends Document {
    @Prop({ required: true })
    orderId: string;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({ type: [PlanSchema], required: true })
    plans: Plan[];

    @Prop({ required: true, default: false })
    isDeleted: boolean;
}

export const PaymentPlanSchema = SchemaFactory.createForClass(PaymentPlan);
