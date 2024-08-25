const express = require('express');
const cors = require('cors'); // Import the CORS package

const app = express();
const port = 3000;

app.use(cors()); // Use CORS middleware
app.use(express.json());

app.post('/api/bfhl', (req, res) => {
    const { userId, emailId, collegeRollNumber, inputArray } = req.body;
    if (!userId || !emailId || !collegeRollNumber || !inputArray) {
        return res.status(400).json({ status: "failure", message: "Missing required fields" });
    }

    const numbers = inputArray.filter(item => typeof item === 'number');
    const alphabets = inputArray.filter(item => typeof item === 'string');
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? 
                                      lowercaseAlphabets.reduce((a, b) => a > b ? a : b) : 
                                      null;

    const response = {
        status: "success",
        userId,
        emailId,
        collegeRollNumber,
        numbers,
        alphabets,
        highestLowercaseAlphabet
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
