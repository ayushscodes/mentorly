const express = require('express');


const router = express.Router();
const Circle = require('../models/Circle')


/* GET circle given user and need*/
router.get('/:skill', async function (req, res) {
    const email = 'kacie@mit.edu'; // TODO: probably logged in user
    const need = req.params.skill;  // string (skill_name)
    const match = await Circle.findCircle(email, need);
    
    if (match !== undefined) {
        res.status(200).json("Successfully matched with " + match[0].email).end();
    } else {
        res.status(400).json("Could not find a match.");
    }
});

module.exports = router;





