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

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm();

	const onSubmit = (data: FormData) => {
		setTimeout(() => {
			return console.log(data);
		}, 1000);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-blue-200 form-control h-screen flex flex-col justify-center items-center"
		>
			<input
				{...register("email", {
					required: "Email is required",
				})}
				className="input input-success"
				type="email"
				placeholder="Email"
			/>
			{errors.email && (
				<span className="text-red-500 text-sm">
					<>{errors.email.message}</>
				</span>
			)}
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
				className="input input-success"
				type="password"
				placeholder="Password"
			/>
			{errors.password && (
				<span className="text-red-500 text-sm">
					<>{errors.password.message}</>
				</span>
			)}
			{/* <button className="btn btn-primary" onClick={reset}>Reset</button> */}
			<button className="btn btn-primary" type="submit" disabled={isSubmitting}>
				Submit
			</button>
		</form>
	);
};

export default Login;
