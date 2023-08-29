const User = require('../../model/User')
const Loan = require('../../model/Loan')

module.exports = {
    viewUser : async(req, res) => {
        try {
            const user = await User.find().sort({ createdAt: -1 });
            res.status(200).json({
                'status' : "Success",
                'data' : user
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    addUser : async(req, res) => {
        try {
            const { name, username, password, isAdmin } = req.body;
            const data = {
                name,
                username,
                password,
                isAdmin
            }
            await User.create(data)
            res.status(200).json({
                'status' : "Success Add"
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    editUser : async(req, res) => {
        try {
            const { id } = req.params;
            const { name, password, username, isAdmin } = req.body;
            const data = {
                name,
                username,
                password,
                isAdmin,
                updatedAt : new Date()
            }
            const user =  await User.findByIdAndUpdate(id, data)
            await user.save();
            res.status(200).json({
                'status' : "Success Edit"
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    deleteUser : async(req, res) => {
        try {
            const { id } = req.params;
            const loan = await Loan.find({ 'userId': id })
            if(loan.length > 0){
                res.status(400).json({
                    'status' : "User tidak bisa dihapus karena masih dipakai",
                }) 
            }else{
                const user = await User.findOne({ _id: id });
                await user.deleteOne();
                res.status(200).json({
                    'status' : "Success Edit"
                })
            }
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}