export type UserType = {
	id: number;
	email: string;
	password: string;
	name: string;
	phone: string;
	role: "admin" | "guest";
	isVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
};
