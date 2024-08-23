
export interface PricePlan {
    id: string;
    pricePlanId: string;
    file: string;
    name: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdBy: string;
    approvedBy: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}