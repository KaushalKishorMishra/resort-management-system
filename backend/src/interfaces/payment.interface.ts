export interface Payment{
    id?: number;
    amount: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}