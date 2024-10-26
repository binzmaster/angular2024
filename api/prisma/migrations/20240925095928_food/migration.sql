/*
  Warnings:

  - You are about to drop the column `foodtype` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "foodtype",
ADD COLUMN     "foodType" TEXT NOT NULL DEFAULT 'food';
