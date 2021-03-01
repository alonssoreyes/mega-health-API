const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const {dbConnect} = require('./database/config');
const router = express.Router();
const usuarios = require('./controllers/user');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

const connect = async () => {
    await dbConnect();
}
connect();
app.use(router);


router.get('/api/usuarios', usuarios.getUsers);
router.post('/api/usuarios', usuarios.saveUser);
router.delete('/api/usuarios/:id', usuarios.deleteUser);





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

module.exports = router;