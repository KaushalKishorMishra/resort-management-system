import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useScrollToElement } from "../../../hooks/useScrollToElement";

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
		return new Promise<void>(resolve => {
			setTimeout(() => {
				console.log(data);
				scrollToThird();
				resolve();
			}, 1000);
		});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="form-control gap-6 p-4 md:p-10 w-full max-w-lg text-white border bg-white bg-opacity-60 rounded-xl"
			>
				<h1 className="mb-2 text-6xl font-bold text-black text-center">Sign Up</h1>
				<p className="mb-3 font-semibold text-xl text-black text-center">
					"Great! Now, let's set up your account password.
				</p>
				<ul className="steps text-black">
					<li className="step step-primary" data-content="✓">
						Account
					</li>
					<li className="step step-primary">Password</li>
					<li className="step">Terms</li>
				</ul>
				<div className="flex flex-col">
					<label htmlFor="password" className="text-black font-semibold text-lg">
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
					<label htmlFor="confirmPassword" className="text-black font-semibold text-lg">
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
					<button className="btn btn-info w-fit rounded-full" onClick={onPrev}>
						Prev
					</button>
					<button
						type="submit"
						className="btn btn-custom-accent w-fit rounded-full self-end"
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
