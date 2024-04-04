import axios from "axios";
import serverUrl from "../config.ts";
import { useUserStore } from "../store/useUserStore.ts";

export const isAuthenticated = async (): Promise<false | "guest" | "admin" | null> => {
	const userId = localStorage.getItem("userId");
	if (typeof window == "undefined") {
		return false;
	} else if (userId) {
		try {
			const res = await axios.get(`${serverUrl}/users/${userId}`, {
				headers: {
					// Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					"Content-Type": "application/json",
				},
			});
			if (res.status !== 200) {
				return false;
			}

			// set store
			useUserStore.setState({
				isAuthenticated: res.data.data.role,
				userId: res.data.data.id,
				name: res.data.data.name,
			});
			return res.data.data.role;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
	return false;
};
