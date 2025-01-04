/*
  Warnings:

  - You are about to drop the column `talkSlug` on the `Speaker` table. All the data in the column will be lost.
  - Added the required column `location_slug` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Speaker" DROP CONSTRAINT "Speaker_talkSlug_fkey";

-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "talkSlug";

-- AlterTable
ALTER TABLE "Talk" ADD COLUMN     "location_slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_SpeakerToTalk" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SpeakerToTalk_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SpeakerToTalk_B_index" ON "_SpeakerToTalk"("B");

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_location_slug_fkey" FOREIGN KEY ("location_slug") REFERENCES "Location"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpeakerToTalk" ADD CONSTRAINT "_SpeakerToTalk_A_fkey" FOREIGN KEY ("A") REFERENCES "Speaker"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpeakerToTalk" ADD CONSTRAINT "_SpeakerToTalk_B_fkey" FOREIGN KEY ("B") REFERENCES "Talk"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
