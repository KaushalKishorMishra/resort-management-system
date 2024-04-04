import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { UserApi } from "../apis/userApi";
import { ToastContainer, toast } from "react-toastify";
import UserDashboard from "../components/profile/UserDashboard";
import { useUiAvatar } from "../hooks/useUiAvatar";

const Profile: React.FC = () => {
	// get userID from userStore
	// const userId = useUserStore.getState().userId;
	const [user, setUser] = useState({
		userId: "",
		name: "",
		email: "",
		phone: "",
		role: "",
		createdAt: "",
	});
	const navigate = useNavigate();

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

	const uiAvatarLink = useUiAvatar(user.name, 200);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await UserApi.findOne({ userId: localStorage.getItem("userId")! });
			if (response.status >= 300) {
				toast.error("something went wrong.", {
					position: "top-right",
					theme: "dark",
				});
				return;
			}
			const userData = {
				userId: response.data.data.id as string,
				name: response.data.data.name as string,
				email: response.data.data.email as string,
				phone: response.data.data.phone as string,
				role: response.data.data.role as string,
				createdAt: response.data.data.createdAt as string,
			};
			setUser(userData);
		};
		fetchUser();
	}, []);

	return (
		<>
			<ToastContainer />
			<div className="bg-base-100 py-5 nav-margin">
				<div className="container bg-base-100 max-w-4xl min-h-screen mx-auto rounded-lg overflow-hidden shadow-lg border">
					<div className="profile-header flex flex-col md:flex-row justify-evenly items-center mx-4 my-10 relative">
						<div className="left md:w-2/5 w-full flex-center">
							<div className="w-full max-w-64 flex-center">
								{/* <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
								<img src={uiAvatarLink} className="image-full" />
							</div>
						</div>
						<div className="right w-full md:w-2/5 flex flex-col">
							<h1 className="text-5xl text-white my-4">{user.name}</h1>
							<p className="text-lg text-white"><span className="font-bold">Email:</span> {user.email}</p>
							<p className="text-lg text-white"><span className="font-bold">Phone:</span> {user.phone && user.phone}</p>
							<div
								className="btn-custom-accent w-fit cursor-pointer mt-4"
								onClick={() => handleSignOut()}
							>
								Sign Out
							</div>
						</div>
					</div>
					<hr className="border-custom-bg-light" />
					<UserDashboard />
				</div>
			</div>
		</>
	);
};

export default Profile;
