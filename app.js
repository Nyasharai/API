// Import the express module
const express = require('express');

// Initialize the app object
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Input validation: Ensure data is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            // Item is a number
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
            // Item is a single alphabet
            alphabets.push(item);
            if (item >= 'a' && item <= 'z' && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "john_doe_17091999", 
        email: "john@xyz.com",
        roll_number: "ABCD123", 
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
