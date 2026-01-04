/*
  Warnings:

  - Added the required column `managerId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisationName` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "managerId" TEXT NOT NULL,
ADD COLUMN     "organisationName" TEXT NOT NULL;
