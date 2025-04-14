import { useState } from "react";
import DaySelector from "../components/LifeDashboard/DaySelector";
import SatisfactionSlider from "../components/LifeDashboard/SatisfactionSlider";
import SatisfactionChart from "../components/LifeDashboard/SatisfactionChart";

const LifeDashboardPage = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [satisfactionData, setSatisfactionData] = useState([]);

	const handleSliderChange = (value) => {
		const existing = satisfactionData.find((entry) => entry.date === selectedDate.toDateString());
		let updated;
		if (existing) {
			updated = satisfactionData.map((entry) =>
				entry.date === selectedDate.toDateString()
					? { ...entry, value }
					: entry
			);
		} else {
			updated = [...satisfactionData, { date: selectedDate.toDateString(), value }];
		}
		setSatisfactionData(updated);
	};

	const sortedData = [...satisfactionData].sort(
		(a, b) => new Date(a.date) - new Date(b.date)
	  );	  

	return (
		<div className="min-h-screen p-6 bg-base-100 text-info">
			<h1 className="text-3xl font-bold text-center mb-6">Life Dashboard</h1>

			<div className="max-w-2xl mx-auto space-y-8">
				<DaySelector selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

				<SatisfactionSlider
					selectedDate={selectedDate}
					value={
						satisfactionData.find((entry) => entry.date === selectedDate.toDateString())?.value || 50
					}
					onChange={handleSliderChange}
				/>

				<SatisfactionChart data={sortedData} />
			</div>
		</div>
	);
};

export default LifeDashboardPage;
