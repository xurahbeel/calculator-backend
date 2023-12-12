const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const secretKey = 'mySecret';
const arrayHistory = []

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user@gmail.com' && password === 'password') {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token, username: "user" });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/data', (req, res) => {
    // This endpoint is protected. Only accessible with a valid token.
    const token = req.headers.authorization;
    try {
        const newArray = req.body.array;
        history = newArray;

        res.json({ user: 'test' });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.get('/api/getData', (req, res) => {
    const token = req.headers.authorization;

    try {

        res.json({ array: history });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
