/*
  Warnings:

  - You are about to drop the column `distrubuter` on the `WarrantyRegistration` table. All the data in the column will be lost.
  - Added the required column `distributor` to the `WarrantyRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WarrantyRegistration" DROP COLUMN "distrubuter",
ADD COLUMN     "distributor" TEXT NOT NULL;
