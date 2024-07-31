import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import dashIcon from '../assets/dash.png';
import atmIcon from '../assets/atm.png';
import incomeIcon from '../assets/income.png';
import expenseIcon from '../assets/expense.png';
import signoutIcon from '../assets/signout.png';

const Sidebar = () => {
  const handleLogout = () => {
    // localStorage.removeItem('auth-token');
    sessionStorage.removeItem('email');
    window.location.replace("/");
  };
  const [name, setname] = useState('');
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    console.log(storedEmail);
    if (storedEmail) {
      setname(storedEmail);
    }
  }, []);


  return (
    <div className="sidebar">
      <h1>Email id: {name}</h1>
      <div className="sidebar-content">
        <div className="sidebar-button">
          <img src={dashIcon} alt="Dashboard" className="sidebar-icon" />
          <Link to="/dashboard"><button>Dashboard</button></Link>
        </div>
        <div className="sidebar-button">
          <img src={atmIcon} alt="Transactions" className="sidebar-icon" />
          <Link to="/view-transactions"><button>View Transactions</button></Link>
        </div>
        <div className="sidebar-button">
          <img src={incomeIcon} alt="Incomes" className="sidebar-icon" />
          <Link to="/incomes"><button>Incomes</button></Link>
        </div>
        <div className="sidebar-button">
          <img src={expenseIcon} alt="Expenses" className="sidebar-icon" />
          <Link to="/expenses"><button>Expenses</button></Link>
        </div>
        <div className="sidebar-button">
          <img src={incomeIcon} alt="All Incomes" className="sidebar-icon" />
          <Link to="/allincomes"><button>All Incomes</button></Link>
        </div>
        <div className="sidebar-button">
          <img src={expenseIcon} alt="All Expenses" className="sidebar-icon" />
          <Link to="/allexpenses"><button>All Expenses</button></Link>
        </div>
      </div>
      <div className="sidebar-footer">
        <img src={signoutIcon} alt="Signout" className="sidebar-icon" />
        {localStorage.getItem('auth-token') && (
          <button onClick={handleLogout}>SignOut</button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
