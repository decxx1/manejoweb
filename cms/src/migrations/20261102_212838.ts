import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "usuario" varchar;
  ALTER TABLE "users" ADD COLUMN "legacy_id" numeric;
  ALTER TABLE "planes" ADD COLUMN "legacy_id" numeric;
  ALTER TABLE "equipo" ADD COLUMN "legacy_id" numeric;
  ALTER TABLE "trabajos" ADD COLUMN "legacy_id" numeric;
  ALTER TABLE "servicios" ADD COLUMN "legacy_id" numeric;
  CREATE UNIQUE INDEX "users_usuario_idx" ON "users" USING btree ("usuario");
  CREATE UNIQUE INDEX "users_legacy_id_idx" ON "users" USING btree ("legacy_id");
  CREATE UNIQUE INDEX "planes_legacy_id_idx" ON "planes" USING btree ("legacy_id");
  CREATE UNIQUE INDEX "equipo_legacy_id_idx" ON "equipo" USING btree ("legacy_id");
  CREATE UNIQUE INDEX "trabajos_legacy_id_idx" ON "trabajos" USING btree ("legacy_id");
  CREATE UNIQUE INDEX "servicios_legacy_id_idx" ON "servicios" USING btree ("legacy_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_usuario_idx";
  DROP INDEX "users_legacy_id_idx";
  DROP INDEX "planes_legacy_id_idx";
  DROP INDEX "equipo_legacy_id_idx";
  DROP INDEX "trabajos_legacy_id_idx";
  DROP INDEX "servicios_legacy_id_idx";
  ALTER TABLE "users" DROP COLUMN "usuario";
  ALTER TABLE "users" DROP COLUMN "legacy_id";
  ALTER TABLE "planes" DROP COLUMN "legacy_id";
  ALTER TABLE "equipo" DROP COLUMN "legacy_id";
  ALTER TABLE "trabajos" DROP COLUMN "legacy_id";
  ALTER TABLE "servicios" DROP COLUMN "legacy_id";`)
}
