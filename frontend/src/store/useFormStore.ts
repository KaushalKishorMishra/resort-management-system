import { create } from "zustand";

// create separate signup form and extend with functions
type SignUpData = {
	name: string;
	email: string;
	phone: string;
	password: string;
};

type SignUpAction = {
	setAccountData: (name: string, email: string, phone: string) => void;
	setPassword: (password: string) => void;
}

export const useFormStore = create<SignUpData & SignUpAction>(set => ({
	name: "",
	email: "",
	phone: "",
	password: "",
	setAccountData: (name, email, phone) => set({ name, email, phone }),
	setPassword: (password: string) => set({ password: password }),
}));
