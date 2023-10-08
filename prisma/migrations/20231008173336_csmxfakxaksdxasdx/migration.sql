/*
  Warnings:

  - Made the column `promptTitle` on table `FavoritedPrompt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FavoritedPrompt" ALTER COLUMN "promptTitle" SET NOT NULL;
