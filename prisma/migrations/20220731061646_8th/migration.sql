/*
  Warnings:

  - Added the required column `purchaseDate` to the `WarrantyRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WarrantyRegistration" ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "WarrantyClaim" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "invoice" TEXT NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarrantyClaim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WarrantyClaim" ADD CONSTRAINT "WarrantyClaim_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "WarrantyRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
