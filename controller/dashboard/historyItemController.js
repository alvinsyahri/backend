const HistoryItem = require('../../model/Historyitem')
const Item = require('../../model/Item')

module.exports = {
    viewHistory : async(req, res) => {
        try {
            const history = await HistoryItem.find()
            .populate({
                path: 'itemId',
                select: 'name'
            })
            res.status(200).json({
                'status' : "Success",
                'data' : history
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    addHistory : async(req, res) => {
        try {
            const { itemId, qty } = req.body
            const data = {
                itemId,
                qty: Number(qty)
            }
            await HistoryItem.create(data)
            const item = await Item.findOne({ _id:itemId})
            item.qty = (item.qty + Number(qty))
            item.save()
            res.status(200).json({
                'status' : "Success Add",
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    editHistory : async(req, res) => {
        try {
            const { id } = req.params
            const { itemId, qty } = req.body
            const data = {
                itemId,
                qty: Number(qty)
            }
            const history = await HistoryItem.findOne({ _id:id})
            const item = await Item.findOne({ _id:itemId})
            item.qty = ((item.qty - history.qty) + Number(qty))
            item.save()
            await HistoryItem.findByIdAndUpdate(id, data)
            res.status(200).json({
                'status' : "Success Edit",
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
    deleteHistory : async(req, res) => {
        try {
            const { id } = req.params
            const history = await HistoryItem.findOne({ _id:id})
            const item = await Item.findOne({ _id:history.itemId})
            item.qty = (item.qty - history.qty)
            item.save()
            await HistoryItem.deleteOne({ _id:id })
            res.status(200).json({
                'status' : "Success Delete",
            });
        } catch (error) {
            res.status(400).json({
                'status' : "Error",
                'message' : error.message
            })
        }
    },
}