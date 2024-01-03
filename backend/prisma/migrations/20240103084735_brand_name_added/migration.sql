/*
  Warnings:

  - You are about to drop the column `company` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "company",
ADD COLUMN     "brandName" TEXT NOT NULL DEFAULT '';
