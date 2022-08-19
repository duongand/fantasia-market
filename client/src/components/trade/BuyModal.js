import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import StockForm from '../forms/StockForm';

function BuyModal({ balance, stocks, queryResult, amount, handleAmountChange, buyStock, showBuyStock, closeBuyModal }) {
	const [amountOwned, setAmountOwned] = useState(0);

	useEffect(() => {
		for (const stock of stocks) {
			console.log(stock);
			console.log(queryResult);
			if (stock.stock_symbol === queryResult.symbol) {
				setAmountOwned(stock.amount_own);
			};
		};
	}, [queryResult])

	return (
		<Modal
			show={showBuyStock}
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>{queryResult.symbol}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Container>
					<Row>
						<Col md={6}>
							Current Stock Price: $ {queryResult.price}
						</Col>
						<Col md={6}>
							Current Amount Owned: {amountOwned} shares
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							Balance: $ {balance}
						</Col>
						<Col md={6}>
							<StockForm
								amount={amount}
								handleAmountChange={handleAmountChange}
							/>
						</Col>
					</Row>
				</Container>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="success" type="submit" onClick={buyStock}>Buy</Button>
				<Button variant="danger" onClick={closeBuyModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default BuyModal;