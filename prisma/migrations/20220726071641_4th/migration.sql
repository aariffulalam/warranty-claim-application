/*
  Warnings:

  - You are about to drop the column `modal` on the `Product` table. All the data in the column will be lost.
  - Added the required column `model` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "modal",
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "sellerId" INTEGER NOT NULL,
ALTER COLUMN "image" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePicture" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
