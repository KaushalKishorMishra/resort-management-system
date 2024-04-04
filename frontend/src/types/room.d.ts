type RoomType = {
	id: number;
	name: string;
	type: "deluxe" | "family" | "standard";
	top: string;
	left: string;
	status: "booked" | "available" | "cleaning" | "maintenance";
	description: string;
	price: number;
	capacity: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: null | string;
};
