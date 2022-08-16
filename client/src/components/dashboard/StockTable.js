import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

function StockTable() {
	return (
		<Table striped bordered hover variant="dark" className="stock-table">
			<thead>
				<tr>
					<th>Stock Name</th>
					<th>Amount of Stocks Owned</th>
					<th>Current Stock Price</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Apple</td>
					<td>100</td>
					<td>$1000</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default StockTable;