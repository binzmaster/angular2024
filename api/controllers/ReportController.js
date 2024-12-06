const { PrismaClient } = require('@prisma/client');
const dayjs = require('dayjs');
const prisma = new PrismaClient();

module.exports = {
  sumPerDayInYearAndMonth: async (req, res) => {
    try {
      const year = req.body.year;
      const month = req.body.month;

      const sumPerDay = [];
      const startDate = dayjs(year + '-' + month + '-01');
      const endDate = startDate.endOf('month');

      for (let day = startDate.date(); day <= endDate.date(); day++) {
        const dateFrom = startDate.date(day).format('YYYY-MM-DD');
        const dateTo = startDate.date(day).add(1, 'day').format('YYYY-MM-DD');

        const billSales = await prisma.billSale.findMany({
          where: {
            createDate: {
              gte: new Date(dateFrom),
              lte: new Date(dateTo)
            },
            status: 'use'
          },
          include: {
            BillSaleDetails: true
          }
        });

        let sum = 0;
        for (const billSale of billSales) {
          for (const detail of billSale.BillSaleDetails) {
            sum += detail.price;
          }
        }

        sumPerDay.push({ date: dateFrom, amount: sum });
      }

      return res.send({ results: sumPerDay });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  sumPerMonthInYear: async (req, res) => {
    try {
      const year = req.body.year;
      const sumPerMonth = [];

      for (let month = 1; month <= 12; month++) {
        const startDate = dayjs(year + '-' + month + '-01');
        const endDate = startDate.endOf('month');

        const billSales = await prisma.billSale.findMany({
          where: {
            createDate: {
              gte: new Date(startDate.format('YYYY-MM-DD')),
              lte: new Date(endDate.format('YYYY-MM-DD'))
            },
            status: 'use'
          },
          include: {
            BillSaleDetails: true
          }
        });

        let sum = 0;
        for (const billSale of billSales) {
          for (const detail of billSale.BillSaleDetails) {
            sum += detail.price;
          }
        }

        sumPerMonth.push({ month: startDate.format('MM'), amount: sum });
      }

      return res.send({ results: sumPerMonth });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  }
};