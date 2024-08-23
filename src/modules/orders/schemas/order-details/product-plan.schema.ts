import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tolerances extends Document {
    @Prop({ required: true })
    thickness: string;

    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    density: string;
}

const TolerancesSchema = SchemaFactory.createForClass(Tolerances);

@Schema()
export class PhysicoMedical extends Document {
    @Prop({ required: true })
    ultimateTensileStrength: string;

    @Prop({ required: true })
    yieldStrength: string;

    @Prop({ required: true })
    elongation: string;
}

const PhysicoMedicalSchema = SchemaFactory.createForClass(PhysicoMedical);

@Schema()
export class ContainerPacking extends Document {
    @Prop({ required: true })
    core: string;

    @Prop({ required: true })
    rollType: string;
}

const ContainerPackingSchema = SchemaFactory.createForClass(ContainerPacking);

@Schema()
export class OtherRequirements extends Document {
    @Prop({ required: true })
    productApplication: string;

    @Prop({ required: true })
    printLine: string;

    @Prop({ required: true })
    stamp: string;

    @Prop({ required: true })
    other: string;

    @Prop({ required: true })
    note: string;
}

const OtherRequirementsSchema = SchemaFactory.createForClass(OtherRequirements);

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class ProductPlan extends Document {
    @Prop({ required: true })
    orderDetailId: string;

    @Prop({ required: true })
    estimatedTime: Date;

    @Prop({ type: TolerancesSchema, required: true })
    tolerances: Tolerances;

    @Prop({ type: PhysicoMedicalSchema, required: true })
    physicoMedical: PhysicoMedical;

    @Prop({ type: ContainerPackingSchema, required: true })
    containerPacking: ContainerPacking;

    @Prop({ type: OtherRequirementsSchema, required: false })
    otherRequirements: OtherRequirements;

    @Prop({ required: true, default: false })
    isDeleted: boolean;
}

export const ProductPlanSchema = SchemaFactory.createForClass(ProductPlan);
