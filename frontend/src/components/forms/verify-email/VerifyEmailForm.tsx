import { AxiosResponse } from "axios";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthApi } from "../../../apis/authApi";

const VerifyEmailForm: React.FC = () => {
	const email = useParams().email;
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// reset,
		// getValues,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		const verifyEmailData = {
			email: data.email,
			value: data.verificationToken,
		};
		const response: AxiosResponse = await AuthApi.verifyEmail(verifyEmailData);
		console.log(response.data.message);
		if (response.status >= 200 && response.status < 300) {
			toast.success("Email Verified. Redirecting...", {
				position: "top-right",
				theme: "dark",
			});
			setTimeout(() => {
				navigate("/");
			}, 3000);
		} else {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
		}
	};

	const resendVerificationEmail = async ()=>{
		const response: AxiosResponse = await AuthApi.resendVerificationEmail({email: email!});
		console.log(response.data.message);
		if (response.status >= 200 && response.status < 300) {
			toast.success("Resent Verification Email", {
				position: "top-right",
				theme: "dark",
			});
		} else {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
		}
	}

	return (
		<>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
				<h1 className="mb-2 text-6xl font-bold text-white text-center">Verify Email</h1>
				<p className="mb-3 font-semibold text-xl text-white text-center">
					Please check your inbox and follow the instructions in the email.
				</p>
				<div className="flex flex-col">
					<label htmlFor="email" className="font-semibold text-lg">
						Email*
					</label>
					<input
						{...register("email", {
							required: "Email is required",
						})}
						className="signup-input"
						type="email"
						placeholder="Email"
						defaultValue={email}
					/>
					{errors.email && (
						<span className="text-scarlet">
							<>{errors.email.message}</>
						</span>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="verificationToken" className="font-semibold text-lg">
						Verification Token*
					</label>
					<input
						{...register("verificationToken", {
							required: "Verification Token is required",
							minLength: {
								value: 6,
								message: "Verification token must be 6 characters long",
							},
							maxLength: {
								value: 6,
								message: "Verification token must be 6 characters long",
							},
							pattern: {
								value: /^[0-9]*$/,
								message: "Verification token must be a number",
							}
						})}
						className="signup-input"
						type="text"
						placeholder="XXXXXX"
					/>
					{errors.verificationToken && (
						<span className="text-scarlet">
							<>{errors.verificationToken.message}</>
						</span>
					)}
				</div>
				<button
					type="submit"
					className="btn btn-primary w-fit rounded-full self-end px-6 text-lg"
					disabled={isSubmitting}
				>
					{isSubmitting ? "verifying..." : "Verify"}
				</button>
				<div className={`text-gray-100 text-center text-lg w-full max-w-lg mt-2 btn btn-ghost`} onClick={resendVerificationEmail}>
					Didn't receive email? <span className="text-primary font-bold">Resend Email</span>
				</div>
			</form>
		</>
	);
};

export default VerifyEmailForm;
