import { useEffect, useState } from "react";
import { GoXCircleFill } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { UserApi } from "../../apis/userApi";
import { toast } from "react-toastify";
import { UserType } from "../../types/user";
import { useUserStore } from "../../store/useUserStore";

const EditUser: React.FC = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [initialData, setInitialData] = useState<{
		name: string;
		phone: string;
	}>({
		name: "",
		phone: "",
	});
	const [name, setName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");

	const fetchInitialData = async () => {
		const userId = localStorage.getItem("userId") || useUserStore.getState().userId?.toString();
		const response = await UserApi.findOne({ userId: userId! });
		const data: UserType = response.data.data;
		if (response.status >= 300) {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
			setSuccessMessage("");
			setErrorMessage("Error fetching user");
			throw new Error("Error fetching user");
		}
		setInitialData({
			name: data.name,
			phone: data.phone,
		});
		setName(data.name);
		setPhone(data.phone);
	};

	const handleUpdate = async () => {
		const updatedData = {
			name: name,
			phone: phone,
		};
		const response = await UserApi.update(
			updatedData,
			localStorage.getItem("userId") || useUserStore.getState().userId!.toString()!
		);
		if (response.status >= 200 && response.status < 300) {
			toast.success("Update Successful.", {
				position: "top-right",
				theme: "dark",
				autoClose: 2000,
			});
		} else {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
		}
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
