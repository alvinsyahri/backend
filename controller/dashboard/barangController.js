const Item = require('../../model/Item');
const Category = require('../../model/Category');
const Loan = require('../../model/Loan')

module.exports = {

    viewBarang : async(req, res) => {
        try {
            const item = await Item.find()
            .sort({ createdAt: -1 })
            .populate(
                { 
                    path: 'subCategoryId', 
                    select: 'name', 
                    populate: { 
                        path: 'categoryId', 
                        select: 'name'
                    }
                }
            );
            res.status(200).json({
                'status' : "Success",
                'data' : item
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    addBarang : async(req, res) => {
        try {
            const { name, serialNumber, procurementYear, qty, description, subCategoryId } = req.body;
            const data = {
                name, 
                serialNumber, 
                procurementYear,
                qty,
                description,
                subCategoryId
            }
            await Item.create(data);
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
    editBarang : async(req, res) => {
        try {
            const { id } = req.params;
            const { name, serialNumber, procurementYear, condition, qty, description, subCategoryId } = req.body;
            const data = {
                name, 
                serialNumber, 
                procurementYear,
                condition,
                qty,
                description,
                subCategoryId,
                updatedAt : new Date()
            }
            await Item.findByIdAndUpdate(id, data)
            res.status(200).json({
                'status' : "Success Edit"
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    deleteBarang : async(req, res) => {
        try {
            const { id } = req.params;
            const loan = await Loan.find({ 'itemId': id })
            if(loan.length > 0){
                res.status(400).json({
                    'status' : "Barang tidak bisa dihapus karena masih dipakai",
                })
            }else{
                await Item.deleteOne({ "_id": id })
                res.status(200).json({
                    'status': "Success Delete"
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