-- AlterTable
ALTER TABLE "Annotations" ALTER COLUMN "ant_deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lists" ALTER COLUMN "lst_deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Videos" ALTER COLUMN "vid_deletedAt" DROP NOT NULL;
