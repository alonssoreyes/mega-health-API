const Role = require('../models/role');

const isValidRole = async(role='') => {
    const rolExists = await Role.findOne({role});

    if( !rolExists ) throw new Error('Rol no registrado en la base de datos');

}


module.exports = {
    isValidRole
}