const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fsPath = require('fs-path');
const cors = require('cors');
const {log} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server"); // Import cors

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
app.post('/expenses', (req, res) => {
    try {
        const fs = require("fs"); // Or `import fs from "fs";` with ESM
        if (fs.existsSync("./server_folder/"+req.body.name+"/")) {
            const data = fs.readFileSync("./server_folder/"+req.body.name+"/expanses.json", 'utf-8');
            const info = JSON.parse(data) || [];
            res.status(200).json({ message: 'All expenses',expanses:info });
        }else{
            res.status(200).json({ message: 'Room doesnt exist',loggedIn:false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error',loggedIn:false });
    }
});

app.post('/users', (req, res) => {

    try {
        const fs = require("fs"); // Or `import fs from "fs";` with ESM
        if (fs.existsSync("./server_folder/"+req.body.name+"/")) {
            const data = fs.readFileSync("./server_folder/"+req.body.name+"/users.json", 'utf-8');
            const info = JSON.parse(data) || [];
            res.status(200).json({ message: 'User list',users:info });
        }else{
            res.status(200).json({ message: 'Room doesnt exist',loggedIn:false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error',loggedIn:false });
    }
});

// Endpoint to add expenses
app.post('/addExpenses', (req, res) => {
    try {
        const fs = require("fs"); // Or `import fs from "fs";` with ESM
        if (fs.existsSync("./server_folder/"+req.body.name+"/")) {
            const data = fs.readFileSync("./server_folder/"+req.body.name+"/expanses.json", 'utf-8');
            const info = JSON.parse(data) || [];
            info.push(req.body.expense)
            fs.writeFileSync("./server_folder/"+req.body.name+"/expanses.json", JSON.stringify(info, null, 2));
            res.status(200).json({ message: 'Expense Added',expanses:info });
        }else{
            res.status(200).json({ message: 'Room doesnt exist',loggedIn:false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error',loggedIn:false });
    }
});

app.post('/editExpense', (req, res) => {
    try {
        const fs = require("fs"); // Or `import fs from "fs";` with ESM
        if (fs.existsSync("./server_folder/"+req.body.name+"/")) {
            fs.writeFileSync("./server_folder/"+req.body.name+"/expanses.json", JSON.stringify(req.body.expense, null, 2));
            res.status(200).json({ message: 'Expense Edited' });
        }else{
            res.status(200).json({ message: 'Room doesnt exist',loggedIn:false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error',loggedIn:false });
    }
});

app.post('/addUser', (req, res) => {
    try {
        const fs = require("fs"); // Or `import fs from "fs";` with ESM
        if (fs.existsSync("./server_folder/"+req.body.name+"/")) {
            fs.writeFileSync("./server_folder/"+req.body.name+"/users.json", JSON.stringify(req.body.users, null, 2));
            res.status(200).json({ message: 'User Added' });
        }else{
            res.status(200).json({ message: 'Room doesnt exist',loggedIn:false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error',loggedIn:false });
    }
});

app.post('/checkRoom', (req, res) => {
    try {
        const fs = require("fs"); // Or `import fs from "fs";` with ESM
        if (fs.existsSync("./server_folder/"+req.body.name+"/")) {
            const data = fs.readFileSync("./server_folder/"+req.body.name+"/data.json", 'utf-8');
            const info = JSON.parse(data) || [];
            if(info.name === req.body.name && info.pass === req.body.pass){
                res.status(200).json({ message: 'Logged in',loggedIn:true });
            }else{
                res.status(200).json({ message: 'Wrong auth',loggedIn:false });
            }
        }else{
            res.status(200).json({ message: 'Room doesnt exist',loggedIn:false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error',loggedIn:false });
    }
});

app.post('/createRoom', (req, res) => {
  try {
    const fs = require("fs"); // Or `import fs from "fs";` with ESM
    if (fs.existsSync("./server_folder/"+req.body.name+"/")) {
      res.status(500).json({ message: 'Room name already exits' });
    }else{
      fs.mkdir("./server_folder/"+req.body.name,{recursive:true},function (err){
        if(err) return "Error";
        fs.writeFileSync("./server_folder/"+req.body.name+"/data.json",JSON.stringify(req.body))
      })
      res.status(200).json({ message: 'Room created succesfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other existing endpoints...

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
