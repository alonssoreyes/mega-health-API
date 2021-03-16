

const Equipment = require('../models/equipment');
const bcrypt = require('bcrypt');

const getEquipments = async (req, res) => {

    try {
        const equipments = await Equipment.find({});
        res.json(equipments);
    }
    catch (err) {
        res.status(500).json(err);
    }



}

const saveEquipment = async(req,res) => {
    const {type,assigned_by,assigned_to,department,sucursal,category,brand,serial_number,model,location,active,conditions,buy_date,price_buy,guarantee_date,description} = req.body;
    const equipment = new Equipment(req.body);
    
    //save
    try{
        await equipment.save();
        res.status(200).json(equipment)
    }
    catch (err) {
        res.status(500).json({
            err
        })
    }


}



module.exports = {
    saveEquipment,
    getEquipments
}