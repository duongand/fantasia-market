import Table from 'react-bootstrap/Table';

function StockTable({ stocks }) {
	const stockRows = stocks.map((stock) => {
		return (
			<tr id={stock.id}>
				<td>{stock.company_name}</td>
				<td>{stock.stock_symbol}</td>
				<td>{stock.amount_own}</td>
				<td>{stock.price}</td>
			</tr>
		);
	});

	return (
		<Table striped bordered hover variant="dark" className="stock-table">
			<thead>
				<tr>
					<th>Company name</th>
					<th>Stock symbol</th>
					<th>Amount of owned shares</th>
					<th>Latest stock price (USD)</th>
				</tr>
			</thead>
			<tbody>
				{stockRows}
			</tbody>
		</Table>
	);
};

export default StockTable;