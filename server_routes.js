const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    const options = {
        root: './dist' // Directory root of the file being served. Should be our 'dist' folder.
    };
    const fileName = 'home.html';
    res.sendFile(fileName, options, (err) => {
        (err) ? next(err) : console.log('Sent: ' + fileName);
    });
});

module.exports = router;