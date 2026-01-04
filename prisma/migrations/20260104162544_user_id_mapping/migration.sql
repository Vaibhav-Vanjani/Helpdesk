-- CreateTable
CREATE TABLE "UserIdMapping" (
    "id" SERIAL NOT NULL,
    "invitationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserIdMapping_pkey" PRIMARY KEY ("id")
);
