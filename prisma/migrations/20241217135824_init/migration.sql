-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);
