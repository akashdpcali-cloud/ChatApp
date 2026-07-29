/*
  Warnings:

  - Made the column `groupImage` on table `Chat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "groupImage" SET NOT NULL,
ALTER COLUMN "groupImage" SET DEFAULT '/images/chatapp-default-group.jpeg';
