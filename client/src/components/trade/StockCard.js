import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BuyModal from './BuyModal';
import SellModal from './SellModal';

function StockCard({ balance, stocks, queryResult, amount, handleAmountChange, buyStock, showBuyStock, showBuyModal, closeBuyModal, sellStock, showSellStock, showSellModal, closeSellModal }) {
	return (
		<div className="search-result">
			<Card className="stock-card">
				<Card.Body className="stock-card--body">
					<Card.Title className="stock-card--title">{queryResult.symbol}</Card.Title>
					<Card.Text className="stock-card--text">
						Latest stock price: {queryResult.price}
					</Card.Text>
					<Button className="stock-card--buy-button"variant="success" onClick={showBuyModal}>Buy</Button>
					<Button className="stock-card--sell-button"variant="danger" onClick={showSellModal}>Sell</Button>
				</Card.Body>
			</Card>

			<BuyModal
				balance={balance}
				stocks={stocks}
				queryResult={queryResult}
				amount={amount}
				handleAmountChange={handleAmountChange}
				buyStock={buyStock}
				showBuyStock={showBuyStock}
				closeBuyModal={closeBuyModal}
			/>
			<SellModal
				balance={balance}
				stocks={stocks}
				queryResult={queryResult}
				amount={amount}
				handleAmountChange={handleAmountChange}
				sellStock={sellStock}
				showSellStock={showSellStock}
				closeSellModal={closeSellModal}
			/>
		</div>
	);
};

export default StockCard;