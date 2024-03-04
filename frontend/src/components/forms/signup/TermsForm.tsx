import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useScrollToElement } from "../../../hooks/useScrollToElement";
import { Link } from "react-router-dom";

const TermsForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const scrollToSecond = useScrollToElement("item2");

	const onPrev = () => {
		scrollToSecond();
	};

	const onSubmit = (data: FieldValues) => {
		return new Promise<void>(resolve => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="signup-form"
			>
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
					<label htmlFor="terms" className=" font-semibold text-lg">
						<input
							{...register("terms", {
								required: "Terms is required",
							})}
							className="checkbox-primary rounded-lg"
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
						{errors.terms && (
							<span className="text-red-500">
								<>{errors.terms.message}</>
							</span>
						)}
					</label>
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
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</>
	);
};

export default TermsForm;
