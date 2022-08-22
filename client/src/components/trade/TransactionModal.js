import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import TransactionHeader from './TransactionHeader';
import TransactionBody from './TransactionBody';
import TranscationFooter from './TransactionFooter';

function TransactionModal({ balance, stocks, queryResult, amount, handleAmountChange, transactStocks, modalKey, showModal, closeModal }) {
  const [amountOwned, setAmountOwned] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setAmountOwned(0);
    for (const stock of stocks) {
      if (stock.stock_symbol === queryResult.symbol) {
        setAmountOwned(stock.amount_own);
      };
    };
  }, [stocks, queryResult]);

  useEffect(() => {
    const calculatedSubTotal = Math.round(parseFloat(amount) * parseFloat(queryResult.price) * 100) / 100;
    if (calculatedSubTotal) {
      setSubTotal(calculatedSubTotal);
    } else {
      setSubTotal(0);
    };

    if (modalKey === 'Buy') {
      if (calculatedSubTotal > balance) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      };
    } else if (modalKey === 'Sell') {
      if (amount > amountOwned) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      };
    };
  }, [balance, amount, amountOwned, modalKey, queryResult]);

  return (
    <Modal
      show={showModal}
      backdrop='static'
      keyboard={false}
    >
      <TransactionHeader
        queryResult={queryResult}
      />
      <TransactionBody
        balance={balance}
        queryResult={queryResult}
        amount={amount}
        handleAmountChange={handleAmountChange}
        amountOwned={amountOwned}
      />
      <TranscationFooter
        amount={amount}
        subTotal={subTotal}
        modalKey={modalKey}
        transactStocks={transactStocks}
        closeModal={closeModal}
        showWarning={showWarning}
      />
    </Modal>
  );
};

export default TransactionModal;