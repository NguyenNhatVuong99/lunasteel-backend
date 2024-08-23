export interface OrderOffer {
    id: string;
    note: string;
    reply: string;
    file: string[];
    isAproval: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}