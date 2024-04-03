import { create } from "zustand";

type UserStore = {
	isAuthenticated: false | "guest" | "admin" | null;
	userId: number | null;
	name: string | null;
	setIsAuthenticated: (status: false | "guest" | "admin" | null) => void;
	setUserId: (userId: number) => void;
	setName: (name: string) => void;
};

export const useUserStore = create<UserStore>(set => ({
	isAuthenticated: false,
	userId: null,
	name: null,
	setIsAuthenticated: status => set({ isAuthenticated: status }),
	setUserId: userId => set({ userId }),
	setName: name => set({ name }),
}));
