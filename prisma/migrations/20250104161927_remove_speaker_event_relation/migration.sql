/*
  Warnings:

  - You are about to drop the column `description_en` on the `Speaker` table. All the data in the column will be lost.
  - You are about to drop the column `description_fr` on the `Speaker` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `Speaker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Speaker" DROP CONSTRAINT "Speaker_event_id_fkey";

-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "description_en",
DROP COLUMN "description_fr",
DROP COLUMN "event_id";
