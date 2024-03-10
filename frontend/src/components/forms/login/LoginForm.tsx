import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// reset,
		// getValues,
	} = useForm();

	const onSubmit = (data: FieldValues) => {
		return new Promise<void>(resolve => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
			<h1 className="mb-2 text-6xl font-bold text-white text-center">Login</h1>
			<p className="mb-3 font-semibold text-xl text-white text-center">Login to get started with our platform.</p>
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
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
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
			<button
				type="submit"
				className="btn btn-primary w-fit rounded-full self-end px-6 text-lg"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Submitting..." : "Next"}
			</button>
		</form>
	);
};

export default LoginForm;
