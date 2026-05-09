/*
  Warnings:

  - You are about to drop the column `reatedAt` on the `Review` table. All the data in the column will be lost.
  - The `status` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS');

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "reatedAt",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "ReviewStatus" NOT NULL DEFAULT 'IN_PROGRESS';

-- DropEnum
DROP TYPE "reviewStatus";
