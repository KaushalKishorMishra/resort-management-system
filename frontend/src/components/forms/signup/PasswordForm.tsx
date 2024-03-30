import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useScrollToElement } from "../../../hooks/useScrollToElement";
import { useFormStore } from "../../../store/useFormStore";

const PasswordForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm();

	const scrollToFirst = useScrollToElement("item1");
	const scrollToThird = useScrollToElement("item3");

	const onPrev = () => {
		scrollToFirst();
	};

	const onSubmit = (data: FieldValues) => {
		useFormStore.getState().setPassword(data.password);
		console.log(useFormStore.getState());
		scrollToThird();
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
				<h1 className="mb-2 text-6xl font-bold text-white text-center">Sign Up</h1>
				<p className="mb-3 font-semibold text-xl text-white text-center">
					"Great! Now, let's set up your account password.
				</p>
				<ul className="steps text-white">
					<li className="step step-primary" data-content="✓">
						Account
					</li>
					<li className="step step-primary">Password</li>
					<li className="step">Terms</li>
				</ul>
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
						type="text"
						placeholder="Name"
					/>
					{errors.password && (
						<span className="text-red-500">
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
						className="input input-bordered border-1 rounded-full bg-opacity-60"
						type="text"
						placeholder="Confirm Password"
					/>
					{errors.confirmPassword && (
						<span className="text-red-500">
							<>{errors.confirmPassword.message}</>
						</span>
					)}
				</div>
				<div className="flex justify-between">
					<div className="btn btn-primary btn-outline w-fit rounded-full px-6 text-lg" onClick={onPrev}>
						Back
					</div>
					<button
						type="submit"
						className="btn btn-primary w-fit rounded-full self-end px-6 text-lg"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Next"}
					</button>
				</div>
			</form>
		</>
	);
};

export default PasswordForm;
