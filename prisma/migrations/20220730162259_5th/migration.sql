-- CreateTable
CREATE TABLE "WarrantyRegistration" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "distrubuter" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarrantyRegistration_pkey" PRIMARY KEY ("id")
);
