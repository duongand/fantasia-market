import { useState } from 'react';

function useSellStock() {
	const [showSellStock, setSellShowStock] = useState(false);
	
	function showSellModal() {
		setSellShowStock(true);
	};

	function closeSellModal() {
		setSellShowStock(false);
	};

	return { showSellStock, showSellModal, closeSellModal };
};

export default useSellStock;