/*
  Warnings:

  - The `tagId` column on the `Prompt` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_tagId_fkey";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "tagId",
ADD COLUMN     "tagId" TEXT[];
