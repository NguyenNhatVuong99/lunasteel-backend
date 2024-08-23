
export interface PaymentPlan {
    id: string;
    orderId: string;
    totalPrice: number;
    plans: {
        name: string;
        paymentTerm: string;
        schedules: string[]; 
    }[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}