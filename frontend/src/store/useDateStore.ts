import { create } from "zustand";

type DateStore = {
	startDate: string | null;
	endDate: string | null;
};

export const useDateStore = create<DateStore>(() => ({
	startDate: "2024-04-05",
	endDate: "2024-04-06",
}));
