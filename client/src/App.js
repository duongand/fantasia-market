import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import Trade from './routes/Trade';
import Error from './routes/Error';
import Navigation from './components/common/Navigation';

import useLogin from './hooks/useLogin';
import useRegister from './hooks/useRegister';
import useAccount from './hooks/useAccount';
import useStockSearch from './hooks/useStockSearch';
import useBuyStock from './hooks/useBuyStock';
import useSellStock from './hooks/useSellStock';
import useStockForm from './hooks/useStockForm';

function App() {
  const { loginForm, handleLoginChange, handleLoginSubmit } = useLogin();
  const { registerForm, handleRegisterChange, handleRegisterSubmit } = useRegister();
  const { balance, stocks, updatePurchasedStock, updateSoldStock } = useAccount();
  const { queryDraft, queryResult, handleQueryChange, submitStockQuery } = useStockSearch();
	const { showBuyStock, closeBuyModal, showBuyModal } = useBuyStock();
  const { showSellStock, showSellModal, closeSellModal } = useSellStock();
	const { amount, handleAmountChange, resetAmount } = useStockForm();

	function buyStock(event) {
		event.preventDefault();
    if (amount === 0) return;

		updatePurchasedStock(balance, amount, queryResult);
    resetAmount();
    closeBuyModal();
	};

  function sellStock(event) {
    event.preventDefault();
    if (amount === 0) return;

    updateSoldStock(balance, amount, queryResult);
    resetAmount();
    closeSellModal();
  };

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <Login
            loginForm={loginForm}
            handleChange={handleLoginChange}
            handleSubmit={handleLoginSubmit}
          />}
        />
        <Route path="/register" element={
          <Register
            registerForm={registerForm}
            handleChange={handleRegisterChange}
            handleSubmit={handleRegisterSubmit}
          />}
        />
        <Route path="/dashboard" element={
          <Dashboard
            balance={balance}
            stocks={stocks}
          />}
        />
        <Route path="/trade" element={
          <Trade
						balance={balance}
						stocks={stocks}
            queryDraft={queryDraft}
            queryResult={queryResult}
            handleChange={handleQueryChange}
            handleSubmit={submitStockQuery}
						amount={amount}
						handleAmountChange={handleAmountChange}
						buyStock={buyStock}
						showBuyStock={showBuyStock}
						closeBuyModal={closeBuyModal}
						showBuyModal={showBuyModal}
            sellStock={sellStock}
            showSellStock={showSellStock}
            showSellModal={showSellModal}
            closeSellModal={closeSellModal}
          />}
        />
        <Route path="/404" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;