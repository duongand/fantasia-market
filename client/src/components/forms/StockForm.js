import Form from 'react-bootstrap/Form';

function StockForm({ amount, handleAmountChange }) {
	return (
		<Form.Group>
			<Form.Label>Enter amount:</Form.Label>
			<Form.Control type="number" value={amount} onChange={handleAmountChange}/>
		</Form.Group>
	);
};

export default StockForm;