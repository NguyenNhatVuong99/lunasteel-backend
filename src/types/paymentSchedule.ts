export interface PaymentSchedule {
    id: string;
    paymentDate: Date;
    paymentAmount: number;
    paymentType: 'Prior to Delivery' | 'After Receive Invoice' | 'Deposit' | 'SpecialFinancing';
    isPaided: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}