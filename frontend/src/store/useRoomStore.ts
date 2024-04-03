import { create } from "zustand";

type RoomStore = {
	selectedRoom: number;
	setSelectedRoom: (roomId: number) => void;
};

export const useRoomStore = create<RoomStore>(set => ({
	selectedRoom: 1,
	setSelectedRoom: (roomId: number) => set({ selectedRoom: roomId }),
}));
