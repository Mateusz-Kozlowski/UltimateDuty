import React from "react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";

const SatisfactionChart = ({ data }) => {
	return (
		<div className="w-full bg-secondary p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-white mb-4">Satisfaction Over Time</h3>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" stroke="#ccc" />
					<YAxis domain={[0, 100]} stroke="#ccc" />
					<Tooltip />
					<Line type="monotone" dataKey="value" stroke="#0A66C2" strokeWidth={2} dot={false} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SatisfactionChart;
