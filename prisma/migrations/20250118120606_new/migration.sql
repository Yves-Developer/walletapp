-- CreateTable
CREATE TABLE "MonthHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "YearHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL
);

-- CreateIndex
CREATE INDEX "MonthHistory_userId_day_month_year_idx" ON "MonthHistory"("userId", "day", "month", "year");

-- CreateIndex
CREATE INDEX "YearHistory_userId_month_year_idx" ON "YearHistory"("userId", "month", "year");
