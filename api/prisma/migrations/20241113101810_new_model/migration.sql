-- CreateTable
CREATE TABLE "Orgnization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "promptPay" TEXT,
    "logo" TEXT,
    "taxCode" TEXT NOT NULL,

    CONSTRAINT "Orgnization_pkey" PRIMARY KEY ("id")
);
