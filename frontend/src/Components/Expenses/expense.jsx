import React, { useState ,useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './expense.css';
import Navbar from '../Navbar/navbar';

const IncomeForm = () => {
  const [title, setSalaryTitle] = useState('');
  const [amount, setSalaryAmount] = useState('');
  const [date, setSelectedDate] = useState(null); 
  const [category, setCategory] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchTotalIncome = async () => {
    try {
      const token = localStorage.getItem('auth-token'); // Retrieve the token from local storage
      const userId = sessionStorage.getItem('email');
      console.log(userId);
      const response = await fetch(`${process.env.REACT_APP_HIT_URL}/api/v1/get-expense?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch incomes');
      }
  
      const incomes = await response.json();
      const total = incomes.reduce((sum, income) => sum + income.amount, 0);
      setTotalIncome(total);
    } catch (error) {
      console.error('Error fetching total income:', error.message);
    }
  };
  useEffect(() => {
    fetchTotalIncome();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format selectedDate to MM/dd/yyyy string
    const userId =sessionStorage.getItem('email'); 
    const formattedDate =date.toLocaleDateString('en-US');

    const formData = {
      title,
      amount: parseFloat(amount),
      date: formattedDate, // Sending formatted date as a string
      category,
      userId,
    };

    console.log('Form Data:', formData);

    try {
      const response = await fetch(`${process.env.REACT_APP_HIT_URL}/api/v1/add-expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`API Error: ${errorMessage}`);
      }

      setSalaryTitle('');
      setSalaryAmount('');
      setSelectedDate(null);
      setCategory('');

      console.log('Expense added successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding income:', error.message);
      // Handle error states or display an error message to the user
    }
  };

  const handleInput = (fieldName) => (e) => {
    if (fieldName === 'category') {
      setCategory(e.target.value);
    }
  };

  return (
    <div className="income-form">
      <Navbar />
      <div className="income-form-container">
        <h2 className="kamal">Expenses</h2>
        <h3 className="raju">Total Expense: <span>${totalIncome}</span></h3>
        <form onSubmit={handleSubmit} className="income-form">
          <div className="form-group">
            <label htmlFor="salaryTitle"></label>
            <input
              type="text"
              id="salaryTitle"
              value={title}
              onChange={(e) => setSalaryTitle(e.target.value)}
              placeholder="Expense Title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salaryAmount"></label>
            <input
              type="text"
              id="salaryAmount"
              value={amount}
              onChange={(e) => {
                // Only allow numbers and handle input
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  setSalaryAmount(e.target.value);
                }
              }}
              placeholder="Expense Amount"
              pattern="[0-9]*"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="selectedDate"></label>
            <DatePicker
              id="selectedDate"
              selected={date}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category"></label>
            <select
              required
              value={category}
              name="category"
              id="category"
              onChange={handleInput('category')}
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="salary">Salary</option>
              <option value="freelancing">Freelancing</option>
              <option value="investments">Investments</option>
              <option value="stocks">Stocks</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="bank">Bank Transfer</option>
              <option value="youtube">Youtube</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className='yellow'>+ Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;
