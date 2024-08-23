export interface Customer {
    id: string;
    name: string;
    region: string;
    type: string;
    address: string;
    debtLimit: string;
    balance: {
        title: string;
        value: number;
        percentage: number;
        count: number;
    }[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}