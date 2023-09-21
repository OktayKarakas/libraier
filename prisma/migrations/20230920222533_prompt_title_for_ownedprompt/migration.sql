/*
  Warnings:

  - Added the required column `promptTitle` to the `OwnedPrompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OwnedPrompt" ADD COLUMN     "promptTitle" TEXT NOT NULL;
