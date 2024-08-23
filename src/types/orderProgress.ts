export interface OrderProgress {
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    extend: {
        note: string;
        validityTime: Date;
        isRejected: boolean;
    };
    offer: {
        note: string;
        file: string[];
    };
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}