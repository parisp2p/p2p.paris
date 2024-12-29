/*
  Warnings:

  - You are about to drop the column `image` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Speaker` table. All the data in the column will be lost.
  - Added the required column `image_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `Speaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "image",
ADD COLUMN     "image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "image",
ADD COLUMN     "image_id" TEXT NOT NULL;
