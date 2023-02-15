import express from 'express';

const app = express();

const PORT = 5000;

app.listen(
    PORT,
    () => console.log(`Server is running on: ${5000}`)
);

app.get('/items', (req, res) => {
    res.send("Hello, This is a successful GET Request")
});

app.post('/postRequest', (req, res) => {
    res.send("Hello, This is a successful POST Request")
});

