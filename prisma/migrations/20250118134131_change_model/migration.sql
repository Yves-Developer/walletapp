/*
  Warnings:

  - The primary key for the `YearHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `YearHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,day,month,year]` on the table `MonthHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_YearHistory" (
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL
);
INSERT INTO "new_YearHistory" ("expense", "income", "month", "userId", "year") SELECT "expense", "income", "month", "userId", "year" FROM "YearHistory";
DROP TABLE "YearHistory";
ALTER TABLE "new_YearHistory" RENAME TO "YearHistory";
CREATE INDEX "YearHistory_userId_month_year_idx" ON "YearHistory"("userId", "month", "year");
CREATE UNIQUE INDEX "YearHistory_userId_month_year_key" ON "YearHistory"("userId", "month", "year");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "MonthHistory_userId_day_month_year_key" ON "MonthHistory"("userId", "day", "month", "year");
