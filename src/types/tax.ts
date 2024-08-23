
export interface Tax {
    id: string;
    userId: string;
    name: string;
    value: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
