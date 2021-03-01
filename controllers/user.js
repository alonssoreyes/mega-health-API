

const User = require('../models/user');

const getUsers = async (req, res) => {

    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }



}

const saveUser = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.json({ user })
    }
    catch (err) {
        res.status(500).json({
            err
        })
    }


}

const deleteUser = async (req, res) => {

    const id = req.params.id;
    try {
        const deleteUser = await User.findByIdAndUpdate(id,{status:false})
        if (deleteUser) {

            res.status(200).json(deleteUser)

        }
    } catch (error) {
        res.status(500).json(error)

    }


}


module.exports = {
    getUsers,
    saveUser,
    deleteUser
}