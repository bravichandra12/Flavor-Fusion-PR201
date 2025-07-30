/*
  Warnings:

  - Made the column `prepTime` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cookTime` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `servings` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `difficulty` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Recipe_userId_idx";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "prepTime" SET NOT NULL,
ALTER COLUMN "cookTime" SET NOT NULL,
ALTER COLUMN "servings" SET NOT NULL,
ALTER COLUMN "difficulty" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
