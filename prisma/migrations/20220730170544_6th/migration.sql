/*
  Warnings:

  - You are about to drop the column `Name` on the `WarrantyRegistration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNumber]` on the table `WarrantyRegistration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `WarrantyRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WarrantyRegistration" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "verify" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "WarrantyRegistration_orderNumber_key" ON "WarrantyRegistration"("orderNumber");
