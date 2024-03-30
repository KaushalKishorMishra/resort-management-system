import axios, { AxiosResponse } from "axios";
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
				console.log(response.status);
				console.log(response.data.message);
				return response;
			})
			.catch(error => {
				console.log(error.response.status);
				console.log("Error occurred in signup: ", error.response.data);
				return error.response;
			});
	}

	static async login(data: { email: string; password: string }): Promise<AxiosResponse> {
		return axios
			.post(`${serverUrl}/users/login`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				localStorage.setItem("token", response.data.jwt);
				return response;
			})
			.catch(error => {
				console.log("Error occurred in signup: ", error.response.status, error.response.data);
				return error.response;
			});
	}

	static async verifyEmail(data: { email: string; value: string }): Promise<AxiosResponse> {
		return axios
			.patch(`${serverUrl}/users/verify-user`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				return response;
			})
			.catch(error => {
				console.log("Error occurred in verify email: ", error.response.status, error.response.data);
				return error.response;
			});
	}
}
