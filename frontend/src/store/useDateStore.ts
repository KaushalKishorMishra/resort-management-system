import { create } from "zustand";

type DateStore = {
	startDate: string | null;
	endDate: string | null;
};

export const useDateStore = create<DateStore>(() => ({
	startDate: "",
	endDate: "",
}));
