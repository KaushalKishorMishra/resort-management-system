import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useScrollToElement } from "../../../hooks/useScrollToElement";
import { Link, useNavigate } from "react-router-dom";
import { UserApi } from "../../../apis/auth/userApi";
import { useFormStore } from "../../../store/useFormStore";
import { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TermsForm: React.FC = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const scrollToSecond = useScrollToElement("item2");

	const onPrev = () => {
		scrollToSecond();
	};

	const signUpData = useFormStore(state => ({
		name: state.name,
		email: state.email,
		phone: state.phone,
		password: state.password,
	}));

	const onSubmit = async (data: FieldValues) => {
		if (data.terms === false) {
			return;
		}
		const response: AxiosResponse = await UserApi.signup(signUpData);
		console.log(response.data.message);
		if (response.status >= 200 && response.status < 300) {
			toast.success("SignUp Successful. Redirecting...", {
				position: "top-right",
				theme: "dark"
			});
			setTimeout(() => {
				navigate("/verify-email");
			},3000)
		} else {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark"
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
				<h1 className="mb-2 text-6xl font-bold text-white text-center">Sign Up</h1>
				<p className="mb-3 font-semibold text-xl text-white text-center">
					"Great! Now, let's set up your account password.
				</p>
				<ul className="steps text-white">
					<li className="step step-primary" data-content="✓">
						Account
					</li>
					<li className="step step-primary" data-content="✓">
						Password
					</li>
					<li className="step step-primary">Terms</li>
				</ul>
				<div className="flex flex-col text-black">
					<label htmlFor="terms" className="text-white font-semibold text-lg">
						<input
							{...register("terms", {
								required: "Your must agree to the terms and conditions to continue",
							})}
							className="checkbox checkbox-primary rounded-lg me-2"
							type="checkbox"
							id="terms"
						/>
						By signing in or creating an account, you agree with our{" "}
						<Link
							to="/terms-and-conditions"
							className="inline font-semibold underline text-custom-accent w-fit"
						>
							Terms & conditions
						</Link>
						&nbsp;and&nbsp;
						<Link to="/privacy-policy" className="inline font-semibold underline text-custom-accent w-fit">
							Privacy policy
						</Link>
						<br />
						{errors.terms && (
							<span className="text-red-500 font-normal">
								<>{errors.terms.message}</>
							</span>
						)}
					</label>
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
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</>
	);
};

export default TermsForm;
