-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMapping" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "organisationName" TEXT NOT NULL,

    CONSTRAINT "UserMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectName_key" ON "Project"("projectName");
