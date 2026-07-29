/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `ChatMember` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `content` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."ChatMember" DROP CONSTRAINT "ChatMember_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChatMember" DROP CONSTRAINT "ChatMember_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "imageUrl",
DROP COLUMN "type",
ADD COLUMN     "messageType" "MessageType" NOT NULL DEFAULT 'TEXT',
ALTER COLUMN "content" SET NOT NULL;

-- DropTable
DROP TABLE "public"."ChatMember";

-- CreateTable
CREATE TABLE "ChatParticipant" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChatParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatParticipant_chatId_userId_key" ON "ChatParticipant"("chatId", "userId");

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
