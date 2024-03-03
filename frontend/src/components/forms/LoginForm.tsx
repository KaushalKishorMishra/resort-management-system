import React from "react";
import { FieldError, FieldValues, UseFormRegister, useForm } from "react-hook-form";

type ValidFieldName = "email" | "password";

export type FormData = {
	email: string;
	password: string;
};

export type FormFieldProps = {
	type: string;
	placeholder: string;
	name: ValidFieldName;
	register: UseFormRegister<FormData>;
	error: FieldError | undefined;
	valueAsNumber?: boolean;
};

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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="form-control gap-6 p-4 md:p-10 w-full text-white border bg-white bg-opacity-60 rounded-xl"
		>
			<h1 className="mb-2 text-5xl font-bold text-black">Welcome Back</h1>
			<p className="mb-3 font-semibold text-xl text-black">Login to start booking</p>

			<div className="flex flex-col">
				<input
					{...register("email", {
						required: "Email is required",
					})}
					className="input input-bordered border-1 rounded-full  bg-opacity-80"
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
				<input
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
						maxLength: {
							value: 20,
							message: "Password must be at most 20 characters",
						},
					})}
					className="input input-bordered border-1 rounded-full bg-opacity-80"
					type="password"
					placeholder="Password"
				/>
				{errors.password && (
					<span className="text-red-500">
						<>{errors.password.message}</>
					</span>
				)}
			</div>
			<button className="btn btn-info w-fit me-0 ms-auto rounded-full" type="submit" disabled={isSubmitting}>
				Submit
			</button>
		</form>
	);
};

export default LoginForm;
