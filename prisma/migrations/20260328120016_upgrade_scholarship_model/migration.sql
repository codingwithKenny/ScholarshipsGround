-- CreateEnum
CREATE TYPE "OpportunityCategory" AS ENUM ('SCHOLARSHIP', 'INTERNSHIP', 'FELLOWSHIP', 'GRANT', 'ENTREPRENEURSHIP', 'TRAINING', 'JOB');

-- DropIndex
DROP INDEX "Scholarship_degree_idx";

-- DropIndex
DROP INDEX "Scholarship_fundingType_idx";

-- DropIndex
DROP INDEX "Scholarship_university_idx";

-- AlterTable
ALTER TABLE "Scholarship" ADD COLUMN     "category" "OpportunityCategory" NOT NULL DEFAULT 'SCHOLARSHIP',
ADD COLUMN     "extraDetails" TEXT,
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "trending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "degree" DROP NOT NULL,
ALTER COLUMN "deadline" DROP NOT NULL,
ALTER COLUMN "fundingType" DROP NOT NULL,
ALTER COLUMN "fundingType" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Blog_published_idx" ON "Blog"("published");

-- CreateIndex
CREATE INDEX "Blog_featured_idx" ON "Blog"("featured");

-- CreateIndex
CREATE INDEX "Scholarship_category_idx" ON "Scholarship"("category");

-- CreateIndex
CREATE INDEX "Scholarship_featured_idx" ON "Scholarship"("featured");

-- CreateIndex
CREATE INDEX "Scholarship_trending_idx" ON "Scholarship"("trending");
