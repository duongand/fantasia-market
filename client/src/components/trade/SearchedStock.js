import Button from 'react-bootstrap/Button';
import BuyModal from './BuyModal';

function SearchedStockTable({ balance, stocks, queryResult, amount, handleAmountChange, buyStock, showBuyStock, showBuyModal, closeBuyModal }) {
	return (
		<div className="search-result">
			<p>Stock Symbol: {queryResult.symbol}</p>
			<Button variant="success" onClick={showBuyModal}>Buy</Button>
			<Button variant="danger">Sell</Button>
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
		</div>
	);
};

export default SearchedStockTable;