import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import React, { useEffect, useState } from "react";
import { useDateStore } from "../../store/useDateStore";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type ValueArray = [ValuePiece, ValuePiece];
type Value = ValuePiece | ValueArray;

const DateSelector: React.FC = () => {
	const [value, setValue] = useState<Value>([
		useDateStore.getState().startDate,
		useDateStore.getInitialState().endDate,
	]);

    const updateDate = useDateStore(state => state.updateDate);
	useEffect(() => {
		if (value && Array.isArray(value)) updateDate(value[0] as Date, value[1] as Date);
		console.log(useDateStore.getState().startDate);
		console.log(useDateStore.getState().endDate);
	}, [value]);

	// const handleChange = (value: Value) => {
	// 	console.log(value);
	// 	if (value) {
	// 		const [startDate, endDate] = value as ValueArray;
	// 		useDateStore.setState({ startDate, endDate });
	// 		console.log(useDateStore.getState().startDate);
	// 		console.log(useDateStore.getState().endDate);
	// 	}
	// };

	return (
		<>
			<div className="w-full my-2 rounded-xl bg-custom-bg-dark p-4 flex-evenly">
				{/* <input type="date" className="input input-lg input-bordered" name="startDate" id="startDate" />
				<input type="date" className="input input-lg input-bordered" name="endDate" id="endDate" /> */}
				<DateRangePicker onChange={setValue} value={value} />
			</div>
		</>
	);
};

export default DateSelector;
