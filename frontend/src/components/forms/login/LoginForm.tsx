import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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
			<Link to="/signup" className="text-gray-100 text-center text-lg w-full max-w-lg mt-2 btn btn-ghost">
				Don't have an account?{" "}
				<span className="text-primary font-bold">
					Sign Up
				</span>
			</Link>
			<p className="text-gray-200 text-center text-sm w-full max-w-lg mt-5">
				By continuing to use ResortUI, you agree to our{" "}
				<Link to="terms-and-service" className="text-primary underline font-semibold">
					Terms of Service
				</Link>{" "}
				and{" "}
				<Link to="privacy-policy" className="text-primary underline font-semibold">
					Privacy Policy
				</Link>
				. Personal data added to ResortUI is public by default
			</p>
		</form>
	);
};

export default LoginForm;
