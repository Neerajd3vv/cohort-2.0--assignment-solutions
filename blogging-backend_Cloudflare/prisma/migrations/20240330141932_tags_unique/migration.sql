/*
  Warnings:

  - A unique constraint covering the columns `[tags]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tags_tags_key" ON "Tags"("tags");
