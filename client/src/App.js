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
import useTransaction from './hooks/useTranscation';
import useStockForm from './hooks/useStockForm';

function App() {
  const { accessToken, loginForm, handleLoginChange, handleLoginSubmit, logout } = useLogin();
  const { registerForm, handleRegisterChange, handleRegisterSubmit } = useRegister();
  const { balance, stocks, portfolioWorth, updateStocks } = useAccount(accessToken);
  const { queryDraft, queryResult, handleQueryChange, submitStockQuery } = useStockSearch();
  const { modalKey, showModal, openModal, closeModal } = useTransaction();
  const { amount, handleAmountChange, resetAmount } = useStockForm();

  function transactStocks(event) {
    event.preventDefault();
    if (amount === 0) return;
    updateStocks(balance, queryResult, amount, event.target.value);
    resetAmount();
    closeModal();
  };

  return (
    <div className="App">
      <Navigation
        accessToken={accessToken}
        logout={logout}
      />
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
            accessToken={accessToken}
            balance={balance}
            stocks={stocks}
            portfolioWorth={portfolioWorth}
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
            transactStocks={transactStocks}
            modalKey={modalKey}
            showModal={showModal}
            openModal={openModal}
            closeModal={closeModal}
          />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;