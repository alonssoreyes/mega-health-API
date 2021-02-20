const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

const router = express.Router();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use(router);


router.get('/api/usuarios', (req,res)=> {
    res.send("Hola bebe")
})
router.post('/api/usuarios', (req,res)=> {
    console.log('Saving user...');
    const email = req.body.email;
    const password = req.body.password;

    res.status(200).json({
        email,
        password
    })
})


app.listen(port)

module.exports = router;