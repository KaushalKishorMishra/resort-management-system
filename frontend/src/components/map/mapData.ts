/*
family brown 10
standard orange 4
deluxe yellow 3
activities red 2
*/

type roomDataType = {
	id: number;
	type: "deluxe" | "family" | "standard";
	top: string;
	left: string;
	status: "booked" | "available" | "cleaning" | "maintenance";
};

export const roomData: roomDataType[] = [
	{
		id: 1,
		type: "deluxe",
		top: "31.2%",
		left: "33%",
		status: "available",
	},
	{
		id: 2,
		type: "deluxe",
		top: "31.9%",
		left: "41.3%",
		status: "available",
	},
	{
		id: 3,
		type: "deluxe",
		top: "34.1%",
		left: "50.1%",
		status: "available",
	},
	{
		id: 4,
		type: "family",
		top: "43.6%",
		left: "33.9%",
		status: "available",
	},
	{
		id: 5,
		type: "family",
		top: "44.5%",
		left: "40.1%",
		status: "available",
	},
	{
		id: 6,
		type: "family",
		top: "45%",
		left: "47.2%",
		status: "booked",
	},
	{
		id: 7,
		type: "family",
		top: "44.8%",
		left: "54.9%",
		status: "booked",
	},
	{
		id: 8,
		type: "family",
		top: "36.1%",
		left: "59.6%",
		status: "booked",
	},
	{
		id: 9,
		type: "family",
		top: "33.2%",
		left: "65.1%",
		status: "booked",
	},
	{
		id: 10,
		type: "family",
		top: "31.1%",
		left: "78.6%",
		status: "booked",
	},
	{
		id: 11,
		type: "family",
		top: "29.7%",
		left: "85.2%",
		status: "booked",
	},
	{
		id: 12,
		type: "family",
		top: "40.1%",
		left: "89.4%",
		status: "cleaning",
	},
	{
		id: 13,
		type: "family",
		top: "47.1%",
		left: "92.8%",
		status: "cleaning",
	},

	// standard
	{
		id: 14,
		type: "standard",
		top: "60.4%",
		left: "47.8%",
		status: "cleaning",
	},
	{
		id: 15,
		type: "standard",
		top: "59.7%",
		left: "59.3%",
		status: "cleaning",
	},
	{
		id: 16,
		type: "standard",
		top: "55.9%",
		left: "66.7%",
		status: "cleaning",
	},
	{
		id: 17,
		type: "standard",
		top: "49.6%",
		left: "72.7%",
		status: "maintenance",
	},
];
