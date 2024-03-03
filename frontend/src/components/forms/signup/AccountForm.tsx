import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useScrollToElement } from "../../../hooks/useScrollToElement";

const AccountForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const scrollToSecond = useScrollToElement("item2");

	const onSubmit = (data: FieldValues) => {
		return new Promise<void>(resolve => {
			setTimeout(() => {
				console.log(data);
				scrollToSecond();
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
					Welcome to our platform! Let's get started with some basic information.
				</p>
				<ul className="steps text-black">
					<li className="step step-primary">Account</li>
					<li className="step">Password</li>
					<li className="step">Terms</li>
				</ul>
				<div className="flex flex-col">
					<label htmlFor="name" className="text-black font-semibold text-lg">
						Name*
					</label>
					<input
						{...register("name", {
							required: "Name is required",
						})}
						className="input input-bordered border-1 rounded-full bg-opacity-60"
						type="text"
						placeholder="Name"
					/>
					{errors.name && (
						<span className="text-red-500">
							<>{errors.name.message}</>
						</span>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="name" className="text-black font-semibold text-lg">
						Email*
					</label>
					<input
						{...register("email", {
							required: "Email is required",
						})}
						className="input input-bordered border-1 rounded-full bg-opacity-60"
						type="email"
						placeholder="Email"
					/>
					{errors.email && (
						<span className="text-red-500">
							<>{errors.email.message}</>
						</span>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="name" className="text-black font-semibold text-lg">
						Phone
					</label>
					<input
						{...register("phone", {})}
						className="input input-bordered border-1 rounded-full bg-opacity-60"
						type="text"
						placeholder="Phone"
					/>
					{errors.phone && (
						<span className="text-red-500">
							<>{errors.phone.message}</>
						</span>
					)}
				</div>
				<button
					type="submit"
					className="btn btn-custom-accent w-fit rounded-full self-end"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Next"}
				</button>
			</form>
		</>
	);
};

export default AccountForm;
