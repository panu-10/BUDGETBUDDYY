import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import Navbar from '../Navbar/navbar';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const fetchIncomes = async () => {
    try{
      const userId = sessionStorage.getItem('email');
      console.log(userId);
      const response = await fetch(`${process.env.REACT_APP_HIT_URL}/api/v1/get-incomes?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch incomes');
      }
      const data = await response.json();
      setIncomes(data);
      const total = data.reduce((sum, income) => sum + income.amount, 0);
      setTotalIncome(total);
    } catch (error) {
      console.error('Error fetching incomes:', error.message);
    }
  };

  const fetchExpenses = async () => {
    try{
      const userId = sessionStorage.getItem('email');
      console.log(userId);
      const response = await fetch(`${process.env.REACT_APP_HIT_URL}/api/v1/get-expense?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data);
      const total = data.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching expenses:', error.message);
    }
  };

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  useEffect(() => {
    setTotalBalance(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  const data = {
    labels: incomes.map((inc) => inc.date),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        backgroundColor: 'green',
        borderColor: 'green',
        tension: 0.2,
        fill: false,
      },
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: 'red',
        borderColor: 'red',
        tension: 0.2,
        fill: false,
      },
    ],
  };

  return (
    <DashboardStyled>
      <Navbar />
      <Header>
        <h1>All Transactions</h1>
      </Header>
      <ChartStyled>
        <Line data={data} />
      </ChartStyled>
      
      <TableWrapper>
        <table>
          <tbody>
            <tr>
              <td className="button-container">
                <ButtonContainer>
                  <Button>
                    <Seen>Total Income</Seen>
                    <Value>${totalIncome}</Value>
                  </Button>
                  <Button>
                    <Seen>Total Balance</Seen>
                    <Value><span>${totalBalance}</span></Value>
                  </Button>
                  <Button>
                    <Seen>Total Expenses</Seen>
                    <Value>${totalExpenses}</Value>
                  </Button>
                </ButtonContainer>
              </td>
            </tr>
            <tr>
              <td className="button-container">
                <Container>
                  <Button>
                    <Header><red1>Min</red1> <span>Salary</span> <red1>Max</red1></Header>
                    <Values><span1>${Math.min(...incomes.map(item => item.amount))}</span1><span2>${Math.max(...incomes.map(item => item.amount))}</span2> </Values>
                  </Button>
                  <Button>
                    <Header><red1>Min</red1> <span>Expense</span>  <red1>Max</red1></Header>
                    <Values><span1>${Math.min(...expenses.map(item => item.amount))}</span1> ${Math.max(...expenses.map(item => item.amount))}</Values>
                  </Button>
                </Container>
              </td>
            </tr>
          </tbody>
        </table>
      </TableWrapper>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 2rem;
  margin-right: 2rem;
  margin-left: 800px; /* Adjusted left margin */
  width: 1190px;
  height: 785px;
  margin: 25px;
  padding: 20px;
  background-color: rgb(239, 230, 231);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #FFFFFF;
  position: absolute;
  top: 2%;
  right: 20px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  font-size: 2rem;
  gap: .5rem;
  font-family: inherit;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    margin: 0;
    font-size: 50px;
  }
  span {
    padding-left: 50px;
    padding-right: 50px;
    font-size: 30px;
  }
  red1 {
    font-size: 25px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    padding: 1rem;
    vertical-align: top;
  }
`;

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  width: 50%;
  margin: 2rem 0;
  margin-right: 560px; /* Adjusted right margin */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rem; /* Adjusted gap as per your requirement */
  width: 100%;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  white-space: nowrap;

  &:hover {
    background: #e0e0e0;
  }
`;

const Seen = styled.div`
  font-size: 1.5rem;
`;

const Value = styled.div`
  font-size: 1.5rem;
  margin-top: 0.5rem;

  span {
    color: green;
  }
`;

const Values = styled.div`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  gap: 20rem; /* Adjusted gap between min and max values */
  margin-left: 1px;

  span1 {
    margin-right: 200px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17rem; /* Adjusted gap as per your requirement */
`;

export default Dashboard;
