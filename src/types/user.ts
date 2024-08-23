export interface User {
    id: string;
    employeeId: string;
    email: string;
    password: string;
    fullname: string;
    birthday: Date;
    gender: boolean;
    phone: string;
    avatar: string;
    department: string;
    position: string;
    emailVerifiedAt: Date;
    accessToken: string;
    refreshToken: string;
    status: boolean;
    roles: string[]; // Array of Role IDs
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Role {
    id: string;
    name: string;
    description: string;
    models: string[]; // Array of Model IDs
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Model {
    id: string;
    name: string;
    description: string;
    actions: string[]; // Array of Action IDs
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Action {
    id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}