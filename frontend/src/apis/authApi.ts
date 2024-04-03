import axios, { AxiosResponse } from "axios";
import serverUrl from "../config";
import { useUserStore } from "../store/useUserStore";

export class AuthApi {
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
				console.error("Error occurred in signup: ", error.response.data);
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
				console.warn("success");
				console.log(response.status, response.data.message);
				localStorage.setItem("token", response.data.jwt);
				localStorage.setItem("userId", response.data.data.id);
				useUserStore.setState({
					isAuthenticated: response.data.data.role,
					name: response.data.data.name,
					userId: response.data.data.id,
				});
				return response;
			})
			.catch(error => {
				console.warn("fail");
				console.error("Error occurred in signup: ", error.response.status, error.response.data.message);
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
				console.error("Error occurred in verify email: ", error.response.status, error.response.data);
				return error.response;
			});
	}

	static async resendVerificationEmail(data: { email: string }): Promise<AxiosResponse> {
		return axios
			.patch(`${serverUrl}/users/resend-verification`, data, {
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
					"Error occurred in resend verification email: ",
					error.response.status,
					error.response.data
				);
				return error.response;
			});
	}

	static async forgotPassword(data: { email: string }): Promise<AxiosResponse> {
		return axios
			.post(`${serverUrl}/users/forgot-password`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				localStorage.setItem("resetToken", response.data.jwt);
				return response;
			})
			.catch(error => {
				console.error("Error occurred in forgot password: ", error.response.status, error.response.data);
				return error.response;
			});
	}

	static async resetPassword(data: {
		email: string;
		password: string;
		password_reset_token: string;
	}): Promise<AxiosResponse> {
		console.log(localStorage.getItem("resetJwt"));
		return axios
			.patch(`${serverUrl}/users/reset-password`, data, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("resetJwt")}`,
				},
			})
			.then(response => {
				console.log(response.status, response.data.message);
				return response;
			})
			.catch(error => {
				console.error("Error occurred in reset password: ", error.response.status, error.response.data);
				return error.response;
			});
	}
}
