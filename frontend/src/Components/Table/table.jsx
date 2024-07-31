import React, { useState, useEffect } from 'react';
import './table.css';
import Navbar from '../Navbar/navbar'; // Ensure to have the correct path for Navbar import

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth-token'); // Retrieve the token from local storage
      const userId = sessionStorage.getItem('email');
      const response = await fetch(`${process.env.REACT_APP_HIT_URL}/api/v1/get-incomes?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const deleteIncome = async (incomeId) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`${process.env.REACT_APP_HIT_URL}/api/v1/delete-income/${incomeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete income');
      }
  
      console.log('Income deleted successfully');
      fetchData(); // Refresh incomes after deletion
    } catch (error) {
      console.error('Error deleting income:', error.message);
    }
  };
  

  return (
    <div className="table-container">
      <Navbar /> {/* Ensure Navbar is imported and positioned correctly */}
      <div className="income-form-container">
        <h2>All Incomes</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '4%' }}>Title</th>
              <th style={{ width: '4%' }}>Amount</th>
              <th style={{ width: '4%' }}>Date</th>
              <th style={{ width: '1%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((income) => (
              <tr key={income._id}>
                <td>{income.title}</td>
                <td>${income.amount}</td>
                <td>{income.date}</td>
                <td>
                  <button className="delete-button" onClick={() => deleteIncome(income._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Table;
