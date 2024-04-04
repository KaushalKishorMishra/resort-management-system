import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useScrollToElement } from "../../../hooks/useScrollToElement";
import { Link } from "react-router-dom";
import { useFormStore } from "../../../store/useFormStore";

const AccountForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const scrollToSecond = useScrollToElement("item2");

	const onSubmit = (data: FieldValues) => {
		// set data to global state
		useFormStore.getState().setAccountData(data.name, data.email, data.phone);
		console.log(useFormStore.getState());
		scrollToSecond();
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
				<h1 className="mb-2 text-6xl font-bold text-white text-center">Sign Up</h1>
				<p className="mb-3 font-semibold text-xl text-white text-center">
					Welcome to our platform! Let's get started with some basic information.
				</p>
				<ul className="steps text-white">
					<li className="step step-primary">Account</li>
					<li className="step">Password</li>
					<li className="step">Terms</li>
				</ul>
				<div className="flex flex-col">
					<label htmlFor="name" className="font-semibold text-lg">
						Name*
					</label>
					<input
						{...register("name", {
							required: "Name is required",
						})}
						className="signup-input"
						type="text"
						placeholder="Name"
					/>
					{errors.name && (
						<span className="text-scarlet">
							<>{errors.name.message}</>
						</span>
					)}
				</div>
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
					<label htmlFor="phone" className="font-semibold text-lg">
						Phone
					</label>
					<input {...register("phone", {})} className="signup-input" type="text" placeholder="Phone" />
					{errors.phone && (
						<span className="text-scarlet">
							<>{errors.phone.message}</>
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
				{/* <div className="text-gray-300 text-center w-full max-w-lg mt-3">
					Already have an account?{" "}
					<Link to="/login" className="text-primary font-semibold">
						Login
					</Link>
				</div> */}
				<Link to="/login" className="text-gray-100 text-center text-lg w-full max-w-lg btn btn-ghost">
				Already have an account?{" "}
				<span className="text-primary font-bold">
					Login
				</span>
			</Link>
			</form>
		</>
	);
};

export default AccountForm;
