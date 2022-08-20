import Button from 'react-bootstrap/Button';
import BuyModal from './BuyModal';
import SellModal from './SellModal';

function SearchedStockTable({ balance, stocks, queryResult, amount, handleAmountChange, buyStock, showBuyStock, showBuyModal, closeBuyModal, sellStock, showSellStock, showSellModal, closeSellModal }) {
	return (
		<div className="search-result">
			<p>Stock Symbol: {queryResult.symbol}</p>
			<Button variant="success" onClick={showBuyModal}>Buy</Button>
			<Button variant="danger" onClick={showSellModal}>Sell</Button>
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

export default SearchedStockTable;