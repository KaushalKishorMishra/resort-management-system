import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useDateStore } from "../../store/useDateStore";

const ReactTailwindcssDatePicker: React.FC = () => {
	const [value, setValue] = useState({
		startDate: "",
		endDate: "",
	});

	const handleValueChange = (newValue: any) => {
		const newData: { startDate: string; endDate: string } = {
			startDate: newValue.startDate as string,
			endDate: newValue.endDate as string,
		};
		console.log("newValue:", newData);
		setValue(newData);
		useDateStore.setState(newData);
		console.log(useDateStore.getState());
	};

	return (
		<div className="mt-4 border border-custom-bg-light rounded-lg">
			<Datepicker value={value} onChange={handleValueChange} showShortcuts={true} primaryColor={"orange"} />
		</div>
	);
};

export default ReactTailwindcssDatePicker;
