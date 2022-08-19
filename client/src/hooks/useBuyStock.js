import { useState } from 'react';

function useBuyStock() {
	const [showBuyStock, setShowBuyStock] = useState(false);
	
	function showBuyModal() {
		setShowBuyStock(true);
	};

	function closeBuyModal() {
		setShowBuyStock(false);
	};

	return { showBuyStock, showBuyModal, closeBuyModal };
};

export default useBuyStock;