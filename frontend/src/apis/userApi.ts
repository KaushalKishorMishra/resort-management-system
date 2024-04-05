import axios, { AxiosResponse } from "axios";
import serverUrl from "../config";

export class UserApi {
	static async findOne(data: { userId: string }): Promise<AxiosResponse> {
		return axios
			.get(`${serverUrl}/users/${data.userId}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				return response;
			})
			.catch(error => {
				console.error("Error occurred in find user: ", error.response.status, error.response.data.message);
				return error.response;
			});
	}

	static async update(data: { name: string; phone: string }, userId: string): Promise<AxiosResponse> {
		return axios
			.patch(`${serverUrl}/users/${userId}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				return response;
			})
			.catch(error => {
				console.error("Error occurred in update user: ", error.response.status, error.response.data.message);
				return error.response;
			});
	}
}
