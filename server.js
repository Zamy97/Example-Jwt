const express = require('express');
const jwt = require('jsonwebtoken');


const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the api"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'Aktar',
        email: 'Aktar@gmail.com'
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

// Format of token
// authorization: Bearer <access_token>

// Verify Token function
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        //next middeware
        next()

    } else {
    // Forbidden
    res.sendStatus(403);
    }
}


app.listen(8000, () => {
    console.log("Server started on 8000");
})
