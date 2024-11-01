const { PrismaClient } = require("@prisma/client");
const { error } = require("console");
const prisma = new PrismaClient();
module.exports = {
  create: async (req, res) => {
    try {
      const row = await prisma.food.findFirst({
        where: {
          id: req.body.foodId,
        },
      });

      const oldData = await prisma.saleTemp.findFirst({
        where: {
          foodId: req.body.foodId,
        },
      });

      if (oldData == null) {
        await prisma.saleTemp.create({
          data: {
            foodId: req.body.foodId,
            qty: req.body.qty,
            price: row.price,
            userId: req.body.userId,
            tableNo: req.body.tableNo,
          },
        });
      } else {
        await prisma.saleTemp.update({
          data: {
            qty: oldData.qty + 1,
          },
          where: {
            id: oldData.id,
          },
        });
      }

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },

  list: async (req, res) => {
    try {
      const rows = await prisma.saleTemp.findMany({
        include: {
          Food: true,
          SaleTempDetails:true,
        },
        where: {
          userId: parseInt(req.params.userId),
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  clear: async (req, res) => {
    try {
      await prisma.saleTemp.deleteMany({
        where: {
          userId: parseInt(req.params.userId),
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      const oldData = await prisma.saleTemp.findFirst({
        where: {
          foodId: parseInt(req.params.foodId),
          userId: parseInt(req.params.userId),
        },
        include: {
          SaleTempDetails: true
        }
      });

      if (oldData.saleTempDetails != null) {
        await prisma.saleTemp.deleteMany({
          where: {
            foodId: parseInt(req.params.foodId),
            userId: parseInt(req.params.userId),
          },
        });
      } else {
        // remove from saleTempDetails
        await prisma.saleTempDetail.deleteMany({
          where: {
            saleTempId: oldData.id
          }
        })

        // remove from saleTemp
        await prisma.saleTemp.delete({
          where: {
            id: oldData.id
          }
        })
      }

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  changeQty: async (req, res) => {
    try {
      const oldData = await prisma.saleTemp.findFirst({
        where: {
          id: req.body.id,
        },
      });
      let oldQty = oldData.qty;

      if (req.body.style == "down") {
        oldQty = oldQty - 1;
        if (oldQty < 0) {
          oldQty = 0;
        }
      } else {
        oldQty = oldQty + 1;
      }

      await prisma.saleTemp.update({
        data: {
          qty: oldQty,
        },
        where: {
          id: req.body.id,
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  createDatail: async (req, res) => {
    try {
      const qty = req.body.qty;
      const foodId = req.body.foodId;
      const saleTempId = req.body.saleTempId;

      const oldData = await prisma.saleTempDetail.findFirst({
        where: {
          foodId: foodId,
          saleTempId: saleTempId,
        },
      });
      if (oldData == null) {
        for (let i = 0; i < qty; i++) {
          await prisma.saleTempDetail.create({
            data: {
              foodId: foodId,
              saleTempId: saleTempId,
            },
          });
        }
      }
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  listSaleTempDetail: async (req, res) => {
    try {
      const rows = await prisma.saleTempDetail.findMany({
        include: {
          Food: true,
        },
        where: {
          saleTempId: parseInt(req.params.saleTempId),
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  updateFoodSize: async (req, res) => {
    try {
      const foodSize = await prisma.foodSize.findFirst({
        where: {
          id: req.body.foodSizeId,
        },
      });
      

      await prisma.saleTempDetail.update({
        data: {
          addedMoney: foodSize.moneyAdded,
        },
        where: {
          id: req.body.saleTempId,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  listByFoodTypeId: async(req,res)=>{
    try {
      const rows = await prisma.taste.findMany({
        where:{
          foodTypeId:parseInt(req.params.foodTypeId),
          status:'use'
        },
        orderBy:{
          name:'asc'
        }
      })
      return res.send({results:rows})
    } catch (e) {
      return res.status(500).send({error:e.message})
      
    }
  }
};
