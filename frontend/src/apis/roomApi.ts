import axios, { AxiosResponse } from "axios";
import serverUrl from "../config";

export class RoomApi {
	static async getAllRooms(): Promise<AxiosResponse> {
		return axios
			.get(`${serverUrl}/rooms`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				return response;
			})
			.catch(error => {
				console.error("Error occurred in get all rooms: ", error.response.status, error.response.data.message);
				return error.response;
			});
	}

	static async getRoomDetails(data: { id: number }): Promise<AxiosResponse> {
		return axios
			.post(`${serverUrl}/rooms/find-room`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				return response;
			})
			.catch(error => {
				console.error(
					"Error occurred in get room details: ",
					error.response.status,
					error.response.data.message
				);
				return error.response;
			});
	}

}
