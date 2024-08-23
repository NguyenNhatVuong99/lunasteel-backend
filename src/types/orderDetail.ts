interface SpecialDiscountPrice {
    type: string;
    value: number;
}

interface SpecialRebateOffer {
    type: string;
    value: number;
}

interface Exchange {
    exchangeRateId: string;
    rate: number;
}
export interface OrderDetail {
    id: string;
    orderId: string;
    coilId: string;
    prices: string[]; // Array of Price IDs
    specialDiscountPrice: SpecialDiscountPrice;
    specialRebateOffer: SpecialRebateOffer;
    exchange: Exchange;
    finalPrice: number;
    totalPrice: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}