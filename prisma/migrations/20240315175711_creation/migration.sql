-- CreateTable
CREATE TABLE "tb_event" (
    "id" SERIAL NOT NULL,
    "objet_id" INTEGER NOT NULL,
    "channel_id" TEXT NOT NULL,
    "channel_name" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_origin" TEXT NOT NULL,
    "event_time" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "rule_id" TEXT NOT NULL,
    "rule_name" TEXT NOT NULL,
    "is_send_api" TEXT NOT NULL,
    "is_send_csv" TEXT NOT NULL,
    "velocity" DOUBLE PRECISION NOT NULL,
    "position_x" DOUBLE PRECISION NOT NULL,
    "position_y" DOUBLE PRECISION NOT NULL,
    "token" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome_matriz" TEXT NOT NULL,
    "filial" TEXT NOT NULL,

    CONSTRAINT "tb_event_pkey" PRIMARY KEY ("id")
);
