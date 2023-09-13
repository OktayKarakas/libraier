/*
  Warnings:

  - You are about to drop the column `promptId` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_promptId_fkey";

-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "tagId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "promptId";

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
