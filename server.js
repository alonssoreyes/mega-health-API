const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const {dbConnect} = require('./database/config');
const router = express.Router();
const usuarios = require('./controllers/user');
const { check } = require('express-validator');
const { validateFields } = require('./middlewares/validateFields');

const UI  = process.env.MEGA_HEALTH_UI || 'http://localhost:3000/';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

const connect = async () => {
    await dbConnect();
}
connect();
app.use(router);

app.get('*', (req,res) => { 
    res.sendFile(UI)
})


router.get('/api/usuarios', usuarios.getUsers);
router.post('/api/usuarios',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'Los apellidos son obligatorios').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE', 'AUDITOR_ROLE']),
    validateFields
],  usuarios.saveUser);
router.post('/api/usuarios', usuarios.saveUser);
router.delete('/api/usuarios/:id', usuarios.deleteUser);





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

module.exports = router;