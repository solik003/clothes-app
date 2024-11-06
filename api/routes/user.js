const router = require('express').Router();
const express = require("express");

router.get('/usertest',(req,res) => {
    res.send('User test is successful!');
});
router.post('/userposttest', (req,res) => {
    const username = req.body.username;
    console.log(username);
    res.send('User post test is successful!');
});


module.exports = router;