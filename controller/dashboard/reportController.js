const Loan = require("../../model/Loan");

module.exports = {
  dataPeminjaman: async (req, res) => {
    try {
      const loan = await Loan.find()
        .populate({
          path: "itemId",
          select: "name serialNumber procurementYear condition qty description",
          populate: {
            path: "subCategoryId",
            select: "name",
            populate: {
              path: "categoryId",
              select: "name",
            },
          },
        })
        .populate({ path: "userId", select: "name isAdmin" })
        .sort({ createdAt: -1 });
      res.status(200).json({
        status: "Success",
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    }
  },
};
