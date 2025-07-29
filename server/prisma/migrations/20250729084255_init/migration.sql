/*
  Warnings:

  - Added the required column `contactNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
