import { Chart } from 'react-google-charts';

function AccountVisual() {
	const data = [
		["Task", "Hours per Day"],
		["Work", 11],
		["Eat", 2],
		["Commute", 2],
		["Watch TV", 2],
		["Sleep", 7],
	];

	return (
		<Chart
			chartType="PieChart"
			data={data}
			width={"100%"}
			height={"400px"}
		/>
	);
};

export default AccountVisual;