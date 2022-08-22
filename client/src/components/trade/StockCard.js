import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function StockCard({ queryResult, openModal }) {
	return (
		<Card className="stock-card">
			<Card.Body className="stock-card--body">
				<Card.Title className="stock-card--title">{queryResult.companyName} - {queryResult.symbol}</Card.Title>
				<Card.Text className="stock-card--price">
					Latest stock price: {Math.round(queryResult.price * 100) / 100}
				</Card.Text>
				<Card.Text className="stock-card--price-change" >
					Change in price: 
					<div className={queryResult.change > 0 ? "stock-card--postive-change" : "stock-card--negative-change"}>
						{Math.round((queryResult.change * 100) * 100) / 100}%
					</div>
				</Card.Text>
				<div className="stock-card--buttons">
					<Button className="stock-card--buy-button" variant="success" value="Buy" onClick={openModal}>Buy</Button>
					<Button className="stock-card--sell-button" variant="danger" value="Sell" onClick={openModal}>Sell</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default StockCard;