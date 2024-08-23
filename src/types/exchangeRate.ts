export interface ExchangeRate {
    id: string;
    userId: string;
    rate: number;
    nation: string;
    unit: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}