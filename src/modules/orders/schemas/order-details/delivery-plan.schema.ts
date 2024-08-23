import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GeneralInfor extends Document {
    @Prop({ required: true })
    sepicalRequest: string;

    @Prop({ required: true })
    rangeOfVehicle: string;

    @Prop({ required: true })
    numberOfVehicle: string;
}

const GeneralInforSchema = SchemaFactory.createForClass(GeneralInfor);

@Schema()
export class Departure extends Document {
    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    contact: string;

    @Prop({ required: true })
    phoneNumber: string;
}

const DepartureSchema = SchemaFactory.createForClass(Departure);

@Schema()
export class Destination extends Document {
    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    contact: string;

    @Prop({ required: true })
    phoneNumber: string;
}

const DestinationSchema = SchemaFactory.createForClass(Destination);

@Schema()
export class ContainerPacking extends Document {
    @Prop({ required: true })
    deliveryMethod: string;

    @Prop({ required: true })
    packing: string;

    @Prop({ required: true })
    containerPackeringMethod: string;

    @Prop({ required: true })
    cablesWedges: string;

    @Prop({ required: true })
    lashingWood: string;

    @Prop({ required: true })
    moistureProofBag: string;
}

const ContainerPackingSchema = SchemaFactory.createForClass(ContainerPacking);

@Schema()
export class Packing extends Document {
    @Prop({ required: true })
    spring: string;

    @Prop({ required: true })
    vclPage: string;

    @Prop({ required: true })
    cartonSheet: string;

    @Prop({ required: true })
    pipe: string;

    @Prop({ required: true })
    banding: string;

    @Prop({ required: true })
    outerWrapper: string;

    @Prop({ required: true })
    innerWrapper: string;

    @Prop({ required: true })
    pallet: string;

    @Prop({ required: true })
    palletHanding: string;

    @Prop({ required: true })
    numberOfHalfMoonbar: string;

    @Prop({ required: true })
    typeOfHalfMoonBar: string;

    @Prop({ required: true })
    typeOfPacking: string;

    @Prop({ required: true })
    brace: string;
}

const PackingSchema = SchemaFactory.createForClass(Packing);

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class DeliveryPlan extends Document {
    @Prop({ required: true })
    orderDetailId: string;

    @Prop({ required: true })
    inventoryEtd: Date;

    @Prop({ required: true })
    estimatedTime: Date;

    @Prop({ enum: ['Customer', 'Luna'], required: true })
    deliveryMethod: 'Customer' | 'Luna';

    @Prop({ type: GeneralInforSchema })
    generalInfor: GeneralInfor;

    @Prop({ type: DepartureSchema })
    departure: Departure;

    @Prop({ type: DestinationSchema })
    destination: Destination;

    @Prop({ type: ContainerPackingSchema, required: false })
    containerPacking: ContainerPacking;

    @Prop({ type: PackingSchema })
    packing: Packing;

    @Prop({ required: true, default: false })
    isDeleted: boolean;
}

export const DeliveryPlanSchema = SchemaFactory.createForClass(DeliveryPlan);
