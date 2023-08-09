var express = require('express');
var router = express.Router();
const secretKey = (process.env.secretKey || 'secretkeyfortoken')

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { createUserRecord, findUserRecord } = require('../operations/userOperations')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//user resgitration with hashing

router.post('/userRegistration', async (req, res, next) => {
  let data = req.body


  const saltRounds = 10
  try {

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash
    const result = await createUserRecord(data)
    res.json({
      "sucess": true,
      "message": "user registration complete",

    })



  } catch (e) {
    res.status(400).json({
      "sucess": false,
      "message": "user registration unsuccessfull",
    })
    console.log(e)
  }
  

})

// user login and toke generatiom

router.post('/login', async (req, res, next) => {

  let data = req.body
  if (!data.email && data.password) {

    res.status(400).send({
      "sucess": false,
      "message": "email and password is not valid"

    })
  }
  else {

    const user = await findUserRecord(data)
    if (user && (await bcrypt.compare(data.password, user.password))) {
      const token = jwt.sign(
        { user },
        secretKey,
        {
          expiresIn: "2h",
        }
      );

      res.json({
        "sucess": true,
        "message": "login successfull and token generated",
        "result": { token }
      })
    }
    else {
      res.status(400).json({
        "sucess": false,
        "message": "login unsucesfull",

      })
    }
  }
  
})

module.exports = router;
