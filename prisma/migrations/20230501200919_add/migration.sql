-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annotations" (
    "ant_id" TEXT NOT NULL,
    "ant_videotime" DOUBLE PRECISION NOT NULL,
    "ant_text" TEXT NOT NULL,
    "ant_vid_id" TEXT NOT NULL,
    "ant_deletedAt" TIMESTAMP(3) NOT NULL,
    "ant_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Annotations_pkey" PRIMARY KEY ("ant_id")
);

-- CreateTable
CREATE TABLE "Lists" (
    "lst_id" TEXT NOT NULL,
    "lst_title" TEXT NOT NULL,
    "lst_description" TEXT NOT NULL,
    "lst_usr_id" TEXT NOT NULL,
    "lst_deletedAt" TIMESTAMP(3) NOT NULL,
    "lst_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("lst_id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "vid_id" TEXT NOT NULL,
    "vid_title" TEXT NOT NULL,
    "vid_description" TEXT NOT NULL,
    "vid_youtube_id" TEXT NOT NULL,
    "vid_lst_id" TEXT NOT NULL,
    "vid_deletedAt" TIMESTAMP(3) NOT NULL,
    "vid_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("vid_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annotations" ADD CONSTRAINT "Annotations_ant_vid_id_fkey" FOREIGN KEY ("ant_vid_id") REFERENCES "Videos"("vid_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lists" ADD CONSTRAINT "Lists_lst_usr_id_fkey" FOREIGN KEY ("lst_usr_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_vid_lst_id_fkey" FOREIGN KEY ("vid_lst_id") REFERENCES "Lists"("lst_id") ON DELETE CASCADE ON UPDATE CASCADE;
