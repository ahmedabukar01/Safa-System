/*
  Warnings:

  - A unique constraint covering the columns `[name,createdBy]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productID,createdBy]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productName,createdBy]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Products_productID_key";

-- DropIndex
DROP INDEX "Products_productName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_createdBy_key" ON "Category"("name", "createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "Products_productID_createdBy_key" ON "Products"("productID", "createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "Products_productName_createdBy_key" ON "Products"("productName", "createdBy");
