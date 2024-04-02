import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthApi } from "../../../apis/authApi";

const ResetPasswordForm: React.FC = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// reset,
		getValues,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		const ResetPasswordData = {
			email: localStorage.getItem("resetEmail") as string,
			password: data.password as string,
			password_reset_token: data.password_reset_token as string,
		};
		const response = await AuthApi.resetPassword(ResetPasswordData);
		console.log(response.data.message);
		if (response.status >= 200 && response.status < 300) {
			toast.success("Your account password has been reset. Redirecting to Login page...", {
				position: "top-right",
				theme: "dark",
			});
			setTimeout(() => {
				navigate("/login");
			}, 5000)
		} else {
			toast.error(`${response.data.message} Please try again`, {
				position: "top-right",
				theme: "dark",
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
				<h1 className="mb-2 text-4xl font-bold text-white text-center">Reset Your Password</h1>
				<p className="mb-3 font-semibold text-lg text-white text-center">
					Enter your new password. Password Reset Token has been sent to your email.
				</p>
				<div className="flex flex-col">
					<label htmlFor="password" className="font-semibold text-lg">
						Password*
					</label>
					<input
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 8,
								message: "Password must be at least 9 characters",
							},
							maxLength: {
								value: 20,
								message: "Password must not exceed 20 characters",
							},
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
								message: "Password must contain at least one letter and one number",
							},
						})}
						className="input input-bordered border-1 rounded-full bg-opacity-60"
						type="password"
						placeholder="Password"
						autoComplete="off"
					/>
					{errors.password && (
						<span className="text-scarlet">
							<>{errors.password.message}</>
						</span>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="confirmPassword" className="font-semibold text-lg">
						Confirm Password*
					</label>
					<input
						{...register("confirmPassword", {
							required: "Confirm Password is required",
							validate: value => getValues("password") === value || "Passwords do not match",
						})}
						className="signup-input"
						type="password"
						placeholder="Confirm Password"
					/>
					{errors.confirmPassword && (
						<span className="text-scarlet">
							<>{errors.confirmPassword.message}</>
						</span>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="password_reset_token" className="font-semibold text-lg">
						Password Reset Token*
					</label>
					<input
						{...register("password_reset_token", {
							required: "Confirm Password is required",
							minLength: {
								value: 6,
								message: "Password reset token must be 6 characters long",
							},
							maxLength: {
								value: 6,
								message: "Password reset token must be 6 characters long",
							},
							pattern: {
								value: /^[0-9]*$/,
								message: "Password reset token must be a number",
							},
						})}
						className="signup-input"
						type="text"
						placeholder="Confirm Password"
					/>
					{errors.password_reset_token && (
						<span className="text-scarlet">
							<>{errors.password_reset_token.message}</>
						</span>
					)}
				</div>
				<button
					type="submit"
					className="btn btn-primary w-fit rounded-full self-end px-6 text-lg"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Resetting..." : "Confirm Password Reset"}
				</button>
				<Link to="/signup" className="text-gray-100 text-center text-lg w-full max-w-lg mt-2 btn btn-ghost">
					Remembered you password? <span className="text-primary font-bold">Log In</span>
				</Link>
			</form>
		</>
	);
};

export default ResetPasswordForm;
