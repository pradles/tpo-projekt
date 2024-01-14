const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import cors

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

app.use(cors({
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

const expensesFilePath = './server_folder/expenses.json';

// Read expenses from the JSON file
function readExpensesFromFile() {
    try {
        const data = fs.readFileSync(expensesFilePath, 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Write expenses to the JSON file
function writeExpensesToFile(expenses) {
    try {
        fs.writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2));
    } catch (error) {
        console.error(error);
    }
}

// Endpoint to get expenses
app.get('/expenses', (req, res) => {
    const expenses = readExpensesFromFile();
    res.json(expenses);
});

// Endpoint to add expenses
app.post('/expenses', (req, res) => {
    try {
        const expenses = readExpensesFromFile();
        const newIndex = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
        const newExpense = { id: newIndex, ...req.body };
        expenses.push(newExpense);
        writeExpensesToFile(expenses);
        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Other existing endpoints...

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
