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
const multer = require('multer');
const uuid = require('uuid');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination:  path.join(__dirname, 'public/img/uploads'),
    filename: (req,file, callback, filename)=>{
        callback(null,  uuid.v4() + path.extname(file.originalname))
    }
})
app.use(multer({
    storage:storage
}).single('image'))
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
router.get('/api/usuario/:id', usuarios.getUserName);
router.get('/api/usuarios', usuarios.getUsers);
router.put('/api/usuario/:id', usuarios.updateUser);
router.post('/api/usuarios',  usuarios.saveUser);
router.delete('/api/usuarios/:id',[validateJWT], usuarios.deleteUser);

//Equipment Routes
router.get('/api/equipos', equipos.getEquipments);
router.post('/api/equipos', equipos.saveEquipment);
router.put('/api/equipo/:id', equipos.updateEquipment);
router.delete('/api/equipo/:id', equipos.deleteEquipment);



app.use(express.static(path.join(__dirname,'public')))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

module.exports = router;