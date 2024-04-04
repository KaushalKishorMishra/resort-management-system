import React from "react";
import { FormFieldProps } from "./login/LoginForm";

const FormField: React.FC<FormFieldProps> = ({ type, placeholder, name, register, error, valueAsNumber }) => {
	return (
		<>
			<input
				{...register(name, { valueAsNumber })}
				type={type}
				placeholder={placeholder}
				name={name}
				className="input bg-white"
			/>
			{error && <span className="text-red-500 text-sm">{error.message}</span>}
		</>
	);
};

export default FormField;
