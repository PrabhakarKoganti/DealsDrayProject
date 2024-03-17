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