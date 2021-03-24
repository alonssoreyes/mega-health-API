const Sucursal = require("../models/sucursals");

const saveSucursal = async (req, res) => {
  const sucursal = new Sucursal(req.body);

  if (req.file) {
    imageName = req.file.filename;
    //Set image
    sucursal.imgPath = "/img/uploads/" + imageName;
  }
  try {
    await sucursal.save();
    res.status(201).json(sucursal);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateSucursal = async (req, res) => {
  const id = req.params.id;

  try {
    const sucursal = await Sucursal.findByIdAndUpdate(id, req.body);
    if (req.file) {
      imageName = req.file.filename;
      //Set image
      sucursal.imgPath = "/img/uploads/" + imageName;
    }
    const updated = await sucursal.save();
    if (updated) res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find({});
    res.status(201).json(sucursales);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteSucursal = async (req,res) => {
    const id = req.params.id;
    try{
        const sucursal = await Sucursal.findByIdAndDelete(id);
        if(sucursal){
            res.status(200).json(sucursal)
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
  saveSucursal,
  getSucursales,
  updateSucursal,
  deleteSucursal
};
