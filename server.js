const express = require('express');
const {Router} = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const {dbConnect} = require('./database/config');
const router = express.Router();
const usuarios = require('./controllers/user');
const equipos = require('./controllers/equipment');

const { check } = require('express-validator');
const { validateFields } = require('./middlewares/validateFields');
const path = require('path');
const UI  = process.env.MEGA_HEALTH_UI || 'http://localhost:3000/';
const cors = require('cors');
const { isValidRole } = require('./helpers/db-validators');
const { login } = require('./controllers/auth');
const { validateJWT } = require('./middlewares/validate-jwt');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors({origin:"*"}));

const connect = async () => {
    await dbConnect();
}
connect();
app.use(router);

//User Routes
router.post('/api/auth/login', [
    check('email','El correo es obligatorio').isEmail(),
    check('password', 'Ingrese una contraseña').not().isEmpty(),
    validateFields
] ,login)

router.get('/api/usuarios', usuarios.getUsers);
router.post('/api/usuarios',  usuarios.saveUser);
router.post('/api/usuarios', usuarios.saveUser);
router.delete('/api/usuarios/:id',[validateJWT], usuarios.deleteUser);

//Equipment Routes
router.get('/api/equipos', equipos.getEquipments);

router.post('/api/equipos', equipos.saveEquipment)





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

module.exports = router;