// Import required modules
const express = require('express');

// Create an instance of Express application
const app = express();

// Middleware - JSON body parser
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World! This is your backend server.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
