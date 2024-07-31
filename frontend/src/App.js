import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import Income from './Components/Incomes/income'
import Expense from './Components/Expenses/expense';
import Dash from './Components/Dashboard/dashboard';
import Page from './Components/Page/loginsignup'
import Table from './Components/Table/table'
import Table2 from './Components/Table/table1'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/view-transactions" element={<Dash/>} />
          <Route path="incomes" element={<Income />} />
          <Route path="expenses" element={<Expense />} />
          <Route path="allincomes" element={<Table/>} />
          <Route path="allexpenses" element={<Table2/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
