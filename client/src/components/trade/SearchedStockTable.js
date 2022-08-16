import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function SearchedStockTable() {
	return (
		<Table striped bordered hover variant="dark" className="search-table">
			<thead>
				<tr>
					<th>Stock Symbol</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Apple</td>
					<td><Button variant="success">Buy</Button></td>
					<td><Button variant="danger">Sell</Button></td>
				</tr>
			</tbody>
		</Table>
	);
};

export default SearchedStockTable;