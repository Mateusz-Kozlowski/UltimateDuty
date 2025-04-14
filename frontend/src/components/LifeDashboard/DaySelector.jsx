import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DaySelector = ({ selectedDate, setSelectedDate }) => {
	return (
		<div className="w-full mb-6">
			<label className="block text-info text-sm font-medium mb-2">Select a date</label>
			<DatePicker
  				selected={selectedDate}
  				onChange={(date) => setSelectedDate(date)}
  				dateFormat="yyyy-MM-dd"
  				className="input input-bordered w-full max-w-xs"
			/>
		</div>
	);
};

export default DaySelector;
