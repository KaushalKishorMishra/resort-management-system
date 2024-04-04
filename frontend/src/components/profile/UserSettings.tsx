import React, { useState } from "react";
import { AuthApi } from "../../apis/authApi";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-toastify";
import { GoXCircleFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const UserSettings: React.FC = () => {
	const navigate = useNavigate();
	const [hidePassword, setHidePassword] = useState<boolean>(true);

	const [oldPassword, setOldPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

	const [email, setEmail] = useState<string>(useUserStore.getState().email || "");
	const [deletePassword, setDeletePassword] = useState<string>("");
	const [deleteAccountToken, setDeleteAccountToken] = useState<string>("");
	const [confirmState, setConfirmState] = useState<boolean>(false);
	const [emailMessage, setEmailMessage] = useState({ state: "", message: "" });
	const [disableDeleteButton, setDisableDeleteButton] = useState<boolean>(false);

	const handleSignOut = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("userId");
		localStorage.removeItem("email");
		localStorage.removeItem("name");
		useUserStore.setState({ isAuthenticated: false });
		useUserStore.setState({ userId: null });
		useUserStore.setState({ name: "" });
		navigate("/");
	};

	const handleChangePassword = () => {};

	const handleDeleteAccount = async () => {
		setDisableDeleteButton(true);
		const response = await AuthApi.deleteAccount({ email: email, password: deletePassword });
		if (response.status >= 200 && response.status < 300) {
			toast.success("Confirmation token has been sent to your Email", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000,
			});
			setConfirmState(true);
			setEmailMessage({ state: "success", message: "Email sent" });
		} else {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
			setEmailMessage({ state: "error", message: response.data.message || "Something went wrong" });
		}
		setDisableDeleteButton(false);
	};

	const handleConfirmDelete = async () => {
		setDisableDeleteButton(true);
		const response = await AuthApi.confirmDeleteAccount({ email: email, user_delete_token: deleteAccountToken });
		if (response.status >= 200 && response.status < 300) {
			toast.success("Account Deleted. Redirecting...", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000,
			});
			setConfirmState(true);
			setEmailMessage({ state: "success", message: "Deleted" });
			handleSignOut();
		} else {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
			setEmailMessage({ state: "error", message: response.data.message || "Something went wrong" });
		}
		setDisableDeleteButton(false);
	};
	return (
		<>
			<div className="container mx-auto max-w-lg flex flex-col items- justify-center gap-4 p-4">
				<h1 className="text-4xl font-bold border-b-2">Account Settings</h1>

				<div className="collapse collapse-arrow bg-base-100 border-2">
					<input type="radio" name="my-accordion-2" defaultChecked />
					<div className="collapse-title">
						<h2 className="font-semibold text-lg">Change Password</h2>
					</div>
					<div className="collapse-content">
						<form className="form-control w-full items-start p-4">
							<label className="form-control w-full max-w-lg relative" htmlFor="oldPassword">
								<div className="label">
									<span className="label-text font-semibold">Old Password</span>
								</div>
								<input
									type={hidePassword ? "password" : "text"}
									id="oldPassword"
									placeholder="Your old password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setOldPassword(e.target.value)}
									value={oldPassword}
								/>
								<FaEye
									className="absolute right-4 top-12 text-2xl hover:opacity-60"
									onMouseEnter={() => setHidePassword(false)}
									onMouseLeave={() => setHidePassword(true)}
									onTouchStart={() => setHidePassword(false)}
									onTouchEnd={() => setHidePassword(true)}
								/>
							</label>
							<label className="form-control w-full max-w-lg" htmlFor="newPassword">
								<div className="label">
									<span className="label-text font-semibold">New Password</span>
								</div>
								<input
									type="password"
									id="newPassword"
									placeholder="Your new password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setNewPassword(e.target.value)}
									value={newPassword}
								/>
							</label>
							<label className="form-control w-full max-w-lg" htmlFor="confirmNewPassword">
								<div className="label">
									<span className="label-text font-semibold">Confirm New Password</span>
								</div>
								<input
									type="password"
									id="confirmNewPassword"
									placeholder="Confirm new password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setConfirmNewPassword(e.target.value)}
									value={confirmNewPassword}
								/>
							</label>
							<div
								onClick={handleChangePassword}
								className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white"
							>
								Change Password
							</div>
						</form>
					</div>
				</div>

				<div className="collapse collapse-arrow bg-base-100 border-2">
					<input type="radio" name="my-accordion-2" />
					<div className="collapse-title">
						<h2 className="font-semibold text-lg text-rose-600">Delete Account</h2>
						<p className="text-warning p-2">
							Warning: Deleting your account is irreversible. All your data will be permanently deleted.
							Are you sure you want to proceed?
						</p>
					</div>
					<div className="collapse-content">
						<form className="form-control w-full items-start pb-2 px-2">
							{emailMessage.state == "error" && (
								<div role="alert" className="alert alert-error text-lg">
									<GoXCircleFill size={20} />
									<span>{emailMessage.message}</span>
								</div>
							)}
							<label className="w-full max-w-lg" htmlFor="email">
								<div className="label">
									<span className="label-text font-semibold text-white">Email</span>
								</div>
								<input
									type="email"
									id="email"
									placeholder="Your email"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<label className="w-full max-w-lg relative" htmlFor="deletePassword">
								<div className="label">
									<span className="label-text font-semibold text-white">Password</span>
								</div>
								<input
									type={hidePassword ? "password" : "text"}
									id="deletePassword"
									placeholder="Your password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setDeletePassword(e.target.value)}
									value={deletePassword}
								/>
								<FaEye
									className="absolute right-4 top-12 text-2xl hover:opacity-60"
									onMouseEnter={() => setHidePassword(false)}
									onMouseLeave={() => setHidePassword(true)}
									onTouchStart={() => setHidePassword(false)}
									onTouchEnd={() => setHidePassword(true)}
								/>
							</label>
							{confirmState === false ? (
								<div
									onClick={handleDeleteAccount}
									className={`btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white ${
										disableDeleteButton ? "opacity-30 cursor-wait" : ""
									}`}
								>
									Delete Account
								</div>
							) : (
								<>
									<p className="text-error">
										Are you sure you want to delete your account? A verification token has been sent
										to your email.
									</p>
									<label className="form-control w-full max-w-lg" htmlFor="deleteAccountToken">
										<div className="label">
											<span className="label-text font-semibold">Delete Account Token</span>
										</div>
										<input
											type="number"
											max={6}
											min={6}
											id="deleteAccountToken"
											placeholder="Confirmation account deletion token"
											className="input input-bordered w-full max-w-lg"
											onChange={e => setDeleteAccountToken(e.target.value)}
											value={deleteAccountToken}
										/>
									</label>
									<div
										onClick={handleConfirmDelete}
										className={`btn bg-error/70 hover:bg-error/30 btn-circle w-full max-w-lg mt-5 text-lg text-white ${
											disableDeleteButton ? "opacity-30 cursor-wait" : ""
										}`}
									>
										Confirm Delete
									</div>
								</>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserSettings;
