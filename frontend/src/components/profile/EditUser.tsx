import { useEffect, useState } from "react";
import { GoXCircleFill } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../apis/userApi";
import { toast } from "react-toastify";
import { UserType } from "../../types/user";
import { useUserStore } from "../../store/useUserStore";
import { AuthApi } from "../../apis/authApi";

const EditUser: React.FC = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [initialData, setInitialData] = useState<{
		name: string;
		email: string;
		phone: string;
	}>({
		name: "",
		email: "",
		phone: "",
	});
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [emailInfo, setEmailInfo] = useState<string>("");
	const navigate = useNavigate();

	const fetchInitialData = async () => {
		const userId = localStorage.getItem("userId") || useUserStore.getState().userId?.toString();
		const response = await UserApi.findOne({ userId: userId! });
		const data: UserType = response.data.data;
		if (response.status >= 300) {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
			setErrorMessage("Error fetching user");
			throw new Error("Error fetching user");
		}
		setInitialData({
			name: data.name,
			email: data.email,
			phone: data.phone,
		});
		setName(data.name);
		setEmail(data.email);
		setPhone(data.phone);
	};

	const handleUpdate = () => {
		// const updatedData = {
		// 	name: name,
		// 	email: email,
		// 	phone: phone,
		// };
		// replace wit update route
		UserApi.findOne({ userId: "1" })
			.then(() => {
				setErrorMessage("");
				setSuccessMessage("Profile updated successfully");
				setTimeout(() => {
					if (email !== initialData.email) {
						useUserStore.setState({ email: email });
						localStorage.setItem("email", email);

						// resend otp
						AuthApi.resendVerificationEmail({ email: email })
							.then(res => {
								console.log(res.data);
								navigate("/verify-email");
							})
							.catch(err => {
								console.log(err);
							});
					} else {
						window.location.reload();
					}
				}, 1000);
			})
			.catch(err => {
				setErrorMessage("Error updating profile");
				console.log(err);
			});
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

	const showErrorMessage = () => {
		return errorMessage !== "" ? (
			<>
				<div role="alert" className="alert alert-error">
					<GoXCircleFill />
					<span>{errorMessage}</span>
				</div>
			</>
		) : (
			""
		);
	};

	const showSuccessMessage = () => {
		return successMessage !== "" ? (
			<>
				<div role="alert" className="alert alert-success">
					<FaCheckCircle />
					<span>{successMessage}</span>
				</div>
			</>
		) : (
			""
		);
	};

	return (
		<>
			<div className="bg-opacity-90 bg-base-100 rounded-xl flex-col mx-auto lg:p-10 md:px-7 px-4 py-10 gap-5 w-full max-w-xl">
				<p className="text-3xl font-bold text-center">Update your Profile</p>
				<p className="text-lg text-center">Keep your information current and make your profile shine!</p>

				{/* show message */}
				{showErrorMessage()}
				{showSuccessMessage()}

				<form className="form-control w-full items-start">
					<label className="form-control w-full max-w-lg" htmlFor="name">
						<div className="label">
							<span className="label-text font-semibold">Name</span>
						</div>
						<input
							type="text"
							id="name"
							placeholder="Name"
							className={`input input-bordered w-full max-w-lg ${
								name === initialData.name ? "" : "input-success"
							}`}
							onChange={e => setName(e.target.value)}
							value={name}
						/>
					</label>
					<label className="form-control w-full max-w-lg" htmlFor="email">
						<div className="label">
							<span className="label-text font-semibold">Email Address</span>
						</div>
						<input
							type="email"
							id="email"
							placeholder="Email address"
							className={`input input-bordered w-full max-w-lg ${
								email === initialData.email ? "" : "input-success"
							}`}
							onChange={e => {
								setEmail(e.target.value);
								if (e.target.value !== initialData.email) {
									setEmailInfo("You will need reverify your new email.");
								} else {
									setEmailInfo("");
								}
							}}
							value={email}
						/>
						<p className="text-info text-sm">{emailInfo}</p>
					</label>
					<label className="form-control w-full max-w-lg" htmlFor="phone">
						<div className="label">
							<span className="label-text font-semibold">Phone</span>
						</div>
						<input
							type="text"
							id="phone"
							placeholder="Phone number"
							className={`input input-bordered w-full max-w-lg ${
								phone === initialData.phone ? "" : "input-success"
							}`}
							onChange={e => setPhone(e.target.value)}
							value={phone}
						/>
					</label>
					<div
						onClick={handleUpdate}
						className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white"
					>
						Update
					</div>
				</form>
			</div>
		</>
	);
};

export default EditUser;
