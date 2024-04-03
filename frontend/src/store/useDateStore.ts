import { create } from "zustand";

type DateStore = {
	startDate: Date | null;
	endDate: Date | null;
	updateDate: (startDate: Date, endDate: Date) => void;
};

export const useDateStore = create<DateStore>(set => {
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + 1);

	return {
		startDate: new Date(),
		endDate: endDate,
		updateDate: (startDate: Date, endDate: Date) => set(() => ({ startDate: startDate, endDate: endDate })),
	};
});
