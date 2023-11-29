/*
  Warnings:

  - You are about to drop the column `orderId` on the `OrderDetails` table. All the data in the column will be lost.
  - Added the required column `paymentId` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderDetails" DROP COLUMN "orderId",
ADD COLUMN     "paymentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
