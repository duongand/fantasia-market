import { useState } from 'react';

function useStockForm() {
	const [amount, setAmount] = useState(0);

	function handleAmountChange(event) {
		if (event.target.value >= 0) {
			setAmount(event.target.value);
		};
	};

	return { amount, handleAmountChange };
};

export default useStockForm;