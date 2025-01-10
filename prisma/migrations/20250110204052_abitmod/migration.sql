/*
  Warnings:

  - The primary key for the `logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `logs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_userId_fkey";

-- AlterTable
ALTER TABLE "logs" DROP CONSTRAINT "logs_pkey",
DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "logs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "logs_id_seq";
