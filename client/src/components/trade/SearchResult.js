import StockCard from './StockCard';
import ErrorCard from './ErrorCard';
import TransactionModal from './TransactionModal';

function SearchResult({ balance, stocks, queryResult, amount, handleAmountChange, transactStocks, modalKey, showModal, openModal, closeModal }) {
	return (
		<div className="search-result">
			{queryResult.success ?
				<StockCard
					queryResult={queryResult}
					openModal={openModal}
				/>
				:
				<ErrorCard queryResult={queryResult} />
			}
			<TransactionModal
				balance={balance}
				stocks={stocks}
				queryResult={queryResult}
				amount={amount}
				handleAmountChange={handleAmountChange}
				transactStocks={transactStocks}
				modalKey={modalKey}
				showModal={showModal}
				openModal={openModal}
				closeModal={closeModal}
			/>
		</div>
	);
};

export default SearchResult;