/*
  Warnings:

  - A unique constraint covering the columns `[productID]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productName]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_productID_key" ON "Products"("productID");

-- CreateIndex
CREATE UNIQUE INDEX "Products_productName_key" ON "Products"("productName");
