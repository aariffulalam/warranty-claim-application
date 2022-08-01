/*
  Warnings:

  - Added the required column `pickupAddress` to the `WarrantyClaim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem` to the `WarrantyClaim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemDescription` to the `WarrantyClaim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productGroup` to the `WarrantyClaim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `WarrantyClaim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WarrantyClaim" ADD COLUMN     "pickupAddress" TEXT NOT NULL,
ADD COLUMN     "problem" TEXT NOT NULL,
ADD COLUMN     "problemDescription" TEXT NOT NULL,
ADD COLUMN     "productGroup" TEXT NOT NULL,
ADD COLUMN     "shippingAddress" TEXT NOT NULL;
