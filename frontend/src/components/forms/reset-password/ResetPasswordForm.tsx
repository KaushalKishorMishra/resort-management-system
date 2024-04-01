import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ResetPasswordForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// reset,
		// getValues,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		console.log(data);
	};

	return (
		<>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
				<h1 className="mb-2 text-4xl font-bold text-white text-center">Forgot Your Password?</h1>
				<p className="mb-3 font-semibold text-lg text-white text-center">
					Enter your email and receive password reset link
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
					/>
					{errors.email && (
						<span className="text-scarlet">
							<>{errors.email.message}</>
						</span>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="password" className="font-semibold text-lg">
						Password*
					</label>
					<input
						{...register("password", {
							required: "Password is required",
						})}
						className="signup-input"
						type="password"
						placeholder="Password"
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
					{isSubmitting ? "Submitting..." : "Confirm Password Reset"}
				</button>
				<Link to="/signup" className="text-gray-100 text-center text-lg w-full max-w-lg mt-2 btn btn-ghost">
					Remembered you password? <span className="text-primary font-bold">Log In</span>
				</Link>
			</form>
		</>
	);
};

export default ResetPasswordForm;
