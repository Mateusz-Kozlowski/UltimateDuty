import React from "react";

const SatisfactionSlider = ({ value, onChange }) => {
	return (
		<div className="w-full mb-6">
			<label className="block text-info text-sm font-medium mb-2">How satisfied are you with your life today?</label>
			<div className="flex items-center gap-4">
				<span className="text-info font-semibold">{value}</span>
				<input
					type="range"
					min="0"
					max="100"
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					className="range range-primary flex-grow"
				/>
			</div>
		</div>
	);
};

export default SatisfactionSlider;
