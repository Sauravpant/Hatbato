/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slogan` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAvailable` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('new', 'like_new', 'used', 'refurbished', 'damaged', 'for_parts');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropIndex
DROP INDEX "User_id_idx";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slogan" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deliveryAvailable" BOOLEAN NOT NULL,
ADD COLUMN     "location" geography(point,4326) NOT NULL,
ADD COLUMN     "status" "ProductStatus" NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "categoryId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Product_latitude_longitude_idx" ON "Product"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Product_title_idx" ON "Product"("title");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
