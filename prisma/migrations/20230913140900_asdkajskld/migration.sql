/*
  Warnings:

  - You are about to drop the column `tagId` on the `Prompt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_tagId_fkey";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "tagId";

-- CreateTable
CREATE TABLE "_PromptToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PromptToTag_AB_unique" ON "_PromptToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PromptToTag_B_index" ON "_PromptToTag"("B");

-- AddForeignKey
ALTER TABLE "_PromptToTag" ADD CONSTRAINT "_PromptToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromptToTag" ADD CONSTRAINT "_PromptToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
