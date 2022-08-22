import { useState } from 'react';

function useStockForm() {
	const [amount, setAmount] = useState(0);

	function handleAmountChange(event) {
		if (event.target.value >= 0) setAmount(event.target.value);
	};

	function resetAmount() {
		setAmount(0);
	};

	return { amount, handleAmountChange, resetAmount };
};

export default useStockForm;