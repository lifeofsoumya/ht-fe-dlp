-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CLOSE', 'OPEN', 'IN_PROGRESS', 'DO_THIS');

-- AlterTable
ALTER TABLE "logs" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OPEN';
