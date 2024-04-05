import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useDateStore } from "../../store/useDateStore";
import { GoXCircleFill } from "react-icons/go";

const ReactTailwindcssDatePicker: React.FC = () => {
	const [value, setValue] = useState({
		startDate: sessionStorage.getItem("startDate") || "2024-04-05",
		endDate: sessionStorage.getItem("endDate") || "2024-04-06",
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleValueChange = (newValue: any) => {
		const newData: { startDate: string; endDate: string } = {
			startDate: newValue.startDate as string,
			endDate: newValue.endDate as string,
		};
		console.log("newValue:", newData);
		setValue(newData);
		useDateStore.setState(newData);
		console.log(useDateStore.getState());
		if (new Date(newData.startDate) < new Date("2024-04-05")) {
			setErrorMessage("Start date must be today or later");
			return;
		} else if (new Date(newData.endDate) > new Date("2024-04-12")) {
			setErrorMessage("You can only make booking up to 7 days in advance");
			return;
		}
		setErrorMessage(null);
		sessionStorage.setItem("startDate", newData.startDate);
		sessionStorage.setItem("endDate", newData.endDate);
		window.location.reload();
	};

	return (
		<>
			<div className="mt-4">
				{errorMessage && (
					<div role="alert" className="alert alert-error">
						<GoXCircleFill />
						<span>{errorMessage}</span>
					</div>
				)}
				<div className="mt-4 border border-custom-bg-light rounded-lg">
					<Datepicker
						value={value}
						onChange={handleValueChange}
						showShortcuts={true}
						primaryColor={"orange"}
					/>
				</div>
			</div>
		</>
	);
};

export default ReactTailwindcssDatePicker;
