const Item = require('../../model/Item')
const User = require('../../model/User')

module.exports = {

    viewDashboard : async(req, res) => {
        try {
            const data = await Item.find({ condition: { $in: [2, 3] } })
            .populate({
                path: 'subCategoryId',
                select: 'name',
                populate: {
                    path: 'categoryId',
                    select: 'name'
                }
            })
            let card = []
            card.push(await Item.countDocuments({ qty: { $gt: 0} }))
            card.push(await Item.countDocuments({ qty: 0}))
            card.push(await Item.countDocuments({ condition: { $in: [2, 3] } }))
            res.status(200).json({
                'status' : "Success",
                'valid': true,
                'username': req.username,
                'data': data,
                'card': card 
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'valid': false,
                'message' : error.message
            })
        }
    },
    checkItem : async(req, res) => {
        try {
            const { id } = req.params
            const { description, condition } = req.body
            const item = await Item.findOne({ _id:id })
            console.log(item)
            item.description = description
            item.condition = condition
            item.save()
            res.status(200).json({
                'status' : "Success Check"
            })
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    }
}