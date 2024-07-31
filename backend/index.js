const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const IncomeSchema = require('./models/Income');
const ExpenseSchema = require('./models/Expense');
const jwt = require("jsonwebtoken");
const app = express();
require('dotenv').config()


const PORT = 4000;
app.use(express.json());
app.use(cors());
console.log(process.env.MONGO_URL); 

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

app.post('/api/v1/add-income', async (req, res) => {
    const { title, amount, date, category ,userId} = req.body;

    console.log('Received Data:', req.body);

    const income = new IncomeSchema({
        title,
        amount,
        date,
        category,
        userId,
    });

    console.log('Parsed Data:', { title, amount, date, category,userId });

    try {
        if (!title || !category || !amount || !date || !userId) {
            console.error('Validation Error: All fields are required');
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            console.error('Validation Error: Amount must be a positive number');
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }

    console.log('Income Saved:', income);
});

app.post('/api/v1/add-expense', async (req, res) => {
    const { title, amount, date, category,userId } = req.body;

    console.log('Received Data:', req.body);

    const expense = new ExpenseSchema({
        title,
        amount,
        date,
        category,
        userId,
    });

    console.log('Parsed Data:', { title, amount, date, category,userId });

    try {
        if (!title || !category || !amount || !date ||!userId) {
            console.error('Validation Error: All fields are required');
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            console.error('Validation Error: Amount must be a positive number');
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/api/v1/get-incomes', async (req, res) =>{
    try {
      const userId1=req.query.userId;
      console.log(userId1);
      const incomes = await IncomeSchema.find({ userId: userId1 });
      res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
});

app.get('/api/v1/get-expense', async (req, res) =>{
    try {
      const userId1=req.query.userId;
      console.log(userId1);
      const expenses = await ExpenseSchema.find({ userId: userId1 });
      res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
});


const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
  };
  
  const Users = mongoose.model("Users", {  
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    date: { type: Date, default: Date.now },
    userid: { type: String },
  });
  
  app.post('/api/signup', async (req, res) => {
    console.log("Sign Up");
    let success = false;
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "Existing user found with this email" });
    }
    
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      userid: req.body.id,
    });
    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token });
  });
  
  app.post('/api/login', async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = { user: { id: user.id } };
        success = true;
        console.log(user.id);
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success,name: req.body.name, token });
      } else {
        return res.status(400).json({ success: success, errors: "Please try with correct email/password" });
      }
    } else {
      return res.status(400).json({ success: success, errors: "Please try with correct email/password" });
    }
  });




  app.delete('/api/v1/delete-income/:id', (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
      .then((income) => {
        if (!income) {
          return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
      })
      .catch((err) => {
        console.error('Error deleting income:', err);
        res.status(500).json({ message: 'Server error' });
      });
  });

  app.delete('/api/v1/delete-expense/:id', (req, res) => {
    const { id } = req.params; 
    ExpenseSchema.findByIdAndDelete(id)
      .then((income) => {
        if (!income) {
          return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
      })
      .catch((err) => {
        console.error('Error deleting income:', err);
        res.status(500).json({ message: 'Server error' });
      });
  });


const server = () => {
    app.listen(PORT, () => {
        console.log('Listening on port:', PORT);
    });
};

server();
