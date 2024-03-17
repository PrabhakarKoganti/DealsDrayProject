const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dummy user database
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Serve HTML file for login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check if user exists in the dummy database
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.send('Login successful');
    } else {
        res.send('Invalid username or password');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://kogantiprabhakar24:winthejob123$@cluster0.s9pujfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for your data
const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', itemSchema);

// Middleware
app.use(bodyParser.json());

// Routes
// Get all items
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Create a new item
app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

// Update an existing item
app.put('/api/items/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
