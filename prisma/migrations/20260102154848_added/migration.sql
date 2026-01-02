-- CreateTable
CREATE TABLE "Organisation" (
    "id" SERIAL NOT NULL,
    "organisationName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_organisationName_key" ON "Organisation"("organisationName");
