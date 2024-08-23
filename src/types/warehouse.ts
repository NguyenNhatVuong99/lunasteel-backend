
export interface Warehouse {
    id: string;
    itemId: string;
    coilId: string;
    receiptInfor: object; // Define the structure based on requirements
    supplier: object; // Define the structure based on requirements
    plating: Date;
    weight: object; // Define the structure based on requirements
    amount: string;
    density: number;
    prime: string;
    length: object; // Define the structure based on requirements
    storageLocation: string;
    note: string;
    interpretation: string;
    status: 'enum'; // Define the enum values based on requirements
    createdAt: Date;
    updatedAt: Date;
}