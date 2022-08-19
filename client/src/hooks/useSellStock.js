import { useState } from 'react';

function useSellStock() {
	const [showSellStock, setSellShowStock] = useState(false);
	
	function handleShowStock() {
		setSellShowStock(true);
	};

	function handleClose() {
		setSellShowStock(false);
	};

	return { showSellStock, handleShowStock, handleClose };
};

export default useSellStock;