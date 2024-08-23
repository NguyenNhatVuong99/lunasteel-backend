
export interface PriceDetail {
    pricePlanId: string;
    price: number;
    startDate: Date;
    endDate: Date;
    isPromotion: boolean;
}

export interface Price {
    id: string;
    itemId: string;
    coilId: string;
    supportedDensity: number;
    details: PriceDetail[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}