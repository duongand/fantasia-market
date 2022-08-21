import { Chart } from 'react-google-charts';

function AccountVisual({ stocks }) {
	
	const data = [
		["Stock", "Number of Share"],
	];

	for (const stock of stocks) {
		data.push([stock.stock_symbol, stock.amount_own]);
	};

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