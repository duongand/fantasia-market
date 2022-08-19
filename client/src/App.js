import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import Trade from './routes/Trade';
import Error from './routes/Error';
import Navigation from './components/common/Navigation';

import useLogin from './useLogin';
import useRegister from './useRegister';
import useAccount from './useAccount';
import useStockSearch from './useStockSearch';

function App() {
  const { loginForm, handleLoginChange, handleLoginSubmit } = useLogin();
  const { registerForm, handleRegisterChange, handleRegisterSubmit } = useRegister();
  const { balance, stocks } = useAccount();
  const { queryDraft, stockQuery, queryResult, handleQueryChange, submitStockQuery } = useStockSearch();

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
            queryDraft={queryDraft}
            queryResult={queryResult}
            handleChange={handleQueryChange}
            handleSubmit={submitStockQuery}
          />}
        />
        <Route path="/404" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;