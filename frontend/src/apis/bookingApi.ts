import axios, { AxiosResponse } from "axios";
import serverUrl from "../config";

export class BookingApi {
	static async rangeSearch(data: { start_date: string; end_date: string }): Promise<AxiosResponse> {
		return axios
			.post(`${serverUrl}/bookings/range`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				// console.log(response.status, response.data.message);
				return response;
			})
			.catch(error => {
				console.error("Error occurred in range search: ", error.status, error.response.data.message);
				return error.response;
			});
	}
}
