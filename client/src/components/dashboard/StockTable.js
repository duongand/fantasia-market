import Table from 'react-bootstrap/Table';

function StockTable({ stocks }) {
		const stockRows = stocks.map((stock) => {
			return (
				<tr id={stock.id}>
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
					<th>Stock Name</th>
					<th>Amount of Shares Owned</th>
					<th>Current Stock Price</th>
				</tr>
			</thead>
			<tbody>
				{stockRows}
			</tbody>
		</Table>
	);
};

export default StockTable;