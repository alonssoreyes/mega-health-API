

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
    let imageName;

    const equipment = new Equipment(req.body);
    if(req.file){
        imageName = req.file.filename;
        //Set image
        equipment.imgPath = '/img/uploads/' + imageName;
   }
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
const updateEquipment = async(req,res) => { 
    const id = req.params.id;

    try{
        const updated = await Equipment.findByIdAndUpdate(id,req.body);
        if(updated) res.json(updated);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const deleteEquipment = async (req,res) => { 
    const id = req.params.id;

    try{
        const updated = await Equipment.findByIdAndUpdate(id, {active:false});
        if(updated) res.json(updated);
    }
    catch(err){
        res.status(500).json(err);
    }
}
module.exports = {
    saveEquipment,
    getEquipments,
    updateEquipment,
    deleteEquipment
}