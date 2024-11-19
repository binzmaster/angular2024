/*
  Warnings:

  - You are about to drop the `Orgnization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Orgnization";

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "promptPay" TEXT,
    "logo" TEXT,
    "taxCode" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);
