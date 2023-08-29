const SubCategory = require('../../model/SubCategory');
const Category = require('../../model/Category');
const Item = require('../../model/Item')

module.exports = {

    viewCategory : async(req, res) => {
        try {
            const category = await Category.find()
            const subCategory = await SubCategory.find()
            .sort({ createdAt: -1 })
            .populate(
                { 
                    path: 'categoryId', 
                    select: 'name'
                }
            );
            res.status(200).json({
                'status' : "Success",
                'data' : subCategory,
                'category' : category,
                'valid': true,
                'username': req.username
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    },
    addCategory : async(req, res) => {
        try {
            const { categoryId, name  } = req.body;
            const data = {
                categoryId,
                name
            }
            await SubCategory.create(data)  
            res.status(200).json({
                'status' : "Success Add",
                'valid': true
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    },
    editCategory : async(req, res) => {
        try {
            const { id } = req.params;
            const { name, categoryId } = req.body;
            const data = {
                name,
                categoryId,
                updatedAt : new Date()
            }
            await SubCategory.findByIdAndUpdate(id, data)
            res.status(200).json({
                'status' : "Success Edit",
                'valid': true
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    },
    deleteCategory : async(req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.find({ "subCategoryId": id})
            if(item.length > 0){
                res.status(400).json({
                    'status' : "Category tidak bisa dihapus karena masih dipakai",
                })
            }else{
                await SubCategory.deleteOne({ _id: id})
                res.status(200).json({
                    'status' : "Success Delete",
                    'valid': true
                })
            }
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    }
}