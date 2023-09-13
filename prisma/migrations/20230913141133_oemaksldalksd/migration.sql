/*
  Warnings:

  - You are about to drop the `_PromptToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PromptToTag" DROP CONSTRAINT "_PromptToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PromptToTag" DROP CONSTRAINT "_PromptToTag_B_fkey";

-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "tagId" TEXT[];

-- DropTable
DROP TABLE "_PromptToTag";
