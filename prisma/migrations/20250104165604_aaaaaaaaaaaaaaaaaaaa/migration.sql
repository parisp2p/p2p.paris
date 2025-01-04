/*
  Warnings:

  - You are about to drop the column `location_slug` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventSlug` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `location_slug` on the `Talk` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_location_slug_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_eventSlug_fkey";

-- DropForeignKey
ALTER TABLE "Talk" DROP CONSTRAINT "Talk_location_slug_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "location_slug",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "eventSlug";

-- AlterTable
ALTER TABLE "Talk" DROP COLUMN "location_slug",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_EventToOrganization" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventToOrganization_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventToOrganization_B_index" ON "_EventToOrganization"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToOrganization" ADD CONSTRAINT "_EventToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToOrganization" ADD CONSTRAINT "_EventToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("name") ON DELETE CASCADE ON UPDATE CASCADE;
