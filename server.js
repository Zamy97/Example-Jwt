const express = require('express');
const jwt = require('jsonwebtoken');


conat app = express()

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the api"
    });
});

app.listen(8000, () => {
    console.log("Server started on 8000");
})
