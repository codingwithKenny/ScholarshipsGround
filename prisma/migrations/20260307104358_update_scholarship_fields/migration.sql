/*
  Warnings:

  - You are about to drop the column `applyLink` on the `Scholarship` table. All the data in the column will be lost.
  - The `eligibility` column on the `Scholarship` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FundingType" AS ENUM ('FULLY_FUNDED', 'PARTIALLY_FUNDED', 'TUITION_ONLY', 'SELF_FUNDED');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Scholarship" DROP COLUMN "applyLink",
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fundingType" "FundingType" NOT NULL DEFAULT 'FULLY_FUNDED',
ADD COLUMN     "howToApply" TEXT,
ADD COLUMN     "officialLink" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "university" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "eligibility",
ADD COLUMN     "eligibility" TEXT[];

-- CreateIndex
CREATE INDEX "Scholarship_country_idx" ON "Scholarship"("country");

-- CreateIndex
CREATE INDEX "Scholarship_degree_idx" ON "Scholarship"("degree");

-- CreateIndex
CREATE INDEX "Scholarship_fundingType_idx" ON "Scholarship"("fundingType");

-- CreateIndex
CREATE INDEX "Scholarship_deadline_idx" ON "Scholarship"("deadline");

-- CreateIndex
CREATE INDEX "Scholarship_status_idx" ON "Scholarship"("status");

-- CreateIndex
CREATE INDEX "Scholarship_university_idx" ON "Scholarship"("university");
