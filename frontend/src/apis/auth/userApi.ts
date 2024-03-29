import axios, { AxiosError, AxiosResponse } from "axios";
import serverUrl from "../../config";

export class UserApi {
	static async signup(data: {
		name: string;
		email: string;
		password: string;
		phone: string;
	}): Promise<AxiosResponse> {
		return axios
			.post(`${serverUrl}/users/create`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				return response;
			})
			.catch((error) => {
                console.log('Error occurred in signup: ', error.response.data);
				return error.response;
			});
	}

	static async register(data: { email: string; password: string }): Promise<any> {
		const response = await fetch("http://localhost:3000/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return response.json();
	}
}
