import { create } from "zustand";

type UserStore = {
	isAuthenticated: false | "guest" | "admin" | null;
	userId: number | null;
	name: string | null;
	email: string | null;
	setIsAuthenticated: (status: false | "guest" | "admin" | null) => void;
	setUserId: (userId: number) => void;
	setName: (name: string) => void;
};

export const useUserStore = create<UserStore>(set => ({
	isAuthenticated: false,
	userId: null,
	name: null,
	email: null,
	setIsAuthenticated: status => set({ isAuthenticated: status }),
	setUserId: userId => set({ userId }),
	setName: name => set({ name }),
}));
