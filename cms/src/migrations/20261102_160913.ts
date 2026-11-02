import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_planes_tipo" AS ENUM('paginas-web', 'redes', 'marca');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_mini_url" varchar,
  	"sizes_mini_width" numeric,
  	"sizes_mini_height" numeric,
  	"sizes_mini_mime_type" varchar,
  	"sizes_mini_filesize" numeric,
  	"sizes_mini_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "paginas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"resumen" varchar,
  	"contenido" jsonb,
  	"imagen_id" integer,
  	"meta_titulo" varchar,
  	"meta_descripcion" varchar,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "planes_detalles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "planes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"precio" varchar NOT NULL,
  	"precio_efectivo" varchar,
  	"pago" varchar,
  	"tipo" "enum_planes_tipo" NOT NULL,
  	"orden" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "equipo_conocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"porcentaje" numeric NOT NULL
  );
  
  CREATE TABLE "equipo_educacion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"lugar" varchar,
  	"anio" varchar,
  	"descripcion" varchar
  );
  
  CREATE TABLE "equipo_experiencia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"trabajo" varchar NOT NULL,
  	"lugar" varchar,
  	"anio" varchar,
  	"descripcion" varchar
  );
  
  CREATE TABLE "equipo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"activo" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"nombre" varchar NOT NULL,
  	"titulo" varchar,
  	"presentacion" varchar,
  	"foto_id" integer,
  	"direccion" varchar,
  	"nacimiento" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trabajos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"miembro_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar,
  	"categoria" varchar,
  	"imagen_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "servicios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"miembro_id" integer NOT NULL,
  	"icono" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"paginas_id" integer,
  	"planes_id" integer,
  	"equipo_id" integer,
  	"trabajos_id" integer,
  	"servicios_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sitio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre_empresa" varchar DEFAULT 'Manejo Web',
  	"logo_id" integer,
  	"direccion" varchar,
  	"telefono" varchar,
  	"email" varchar,
  	"equipo_visible" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas" ADD CONSTRAINT "paginas_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "planes_detalles" ADD CONSTRAINT "planes_detalles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."planes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "equipo_conocimientos" ADD CONSTRAINT "equipo_conocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."equipo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "equipo_educacion" ADD CONSTRAINT "equipo_educacion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."equipo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "equipo_experiencia" ADD CONSTRAINT "equipo_experiencia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."equipo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "equipo" ADD CONSTRAINT "equipo_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trabajos" ADD CONSTRAINT "trabajos_miembro_id_equipo_id_fk" FOREIGN KEY ("miembro_id") REFERENCES "public"."equipo"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trabajos" ADD CONSTRAINT "trabajos_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "servicios" ADD CONSTRAINT "servicios_miembro_id_equipo_id_fk" FOREIGN KEY ("miembro_id") REFERENCES "public"."equipo"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_paginas_fk" FOREIGN KEY ("paginas_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_planes_fk" FOREIGN KEY ("planes_id") REFERENCES "public"."planes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_equipo_fk" FOREIGN KEY ("equipo_id") REFERENCES "public"."equipo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trabajos_fk" FOREIGN KEY ("trabajos_id") REFERENCES "public"."trabajos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_servicios_fk" FOREIGN KEY ("servicios_id") REFERENCES "public"."servicios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sitio" ADD CONSTRAINT "sitio_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_mini_sizes_mini_filename_idx" ON "media" USING btree ("sizes_mini_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE UNIQUE INDEX "paginas_slug_idx" ON "paginas" USING btree ("slug");
  CREATE INDEX "paginas_imagen_idx" ON "paginas" USING btree ("imagen_id");
  CREATE INDEX "paginas_updated_at_idx" ON "paginas" USING btree ("updated_at");
  CREATE INDEX "paginas_created_at_idx" ON "paginas" USING btree ("created_at");
  CREATE INDEX "planes_detalles_order_idx" ON "planes_detalles" USING btree ("_order");
  CREATE INDEX "planes_detalles_parent_id_idx" ON "planes_detalles" USING btree ("_parent_id");
  CREATE INDEX "planes_tipo_idx" ON "planes" USING btree ("tipo");
  CREATE INDEX "planes_updated_at_idx" ON "planes" USING btree ("updated_at");
  CREATE INDEX "planes_created_at_idx" ON "planes" USING btree ("created_at");
  CREATE INDEX "equipo_conocimientos_order_idx" ON "equipo_conocimientos" USING btree ("_order");
  CREATE INDEX "equipo_conocimientos_parent_id_idx" ON "equipo_conocimientos" USING btree ("_parent_id");
  CREATE INDEX "equipo_educacion_order_idx" ON "equipo_educacion" USING btree ("_order");
  CREATE INDEX "equipo_educacion_parent_id_idx" ON "equipo_educacion" USING btree ("_parent_id");
  CREATE INDEX "equipo_experiencia_order_idx" ON "equipo_experiencia" USING btree ("_order");
  CREATE INDEX "equipo_experiencia_parent_id_idx" ON "equipo_experiencia" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "equipo_slug_idx" ON "equipo" USING btree ("slug");
  CREATE INDEX "equipo_foto_idx" ON "equipo" USING btree ("foto_id");
  CREATE INDEX "equipo_updated_at_idx" ON "equipo" USING btree ("updated_at");
  CREATE INDEX "equipo_created_at_idx" ON "equipo" USING btree ("created_at");
  CREATE INDEX "trabajos_miembro_idx" ON "trabajos" USING btree ("miembro_id");
  CREATE INDEX "trabajos_categoria_idx" ON "trabajos" USING btree ("categoria");
  CREATE INDEX "trabajos_imagen_idx" ON "trabajos" USING btree ("imagen_id");
  CREATE INDEX "trabajos_updated_at_idx" ON "trabajos" USING btree ("updated_at");
  CREATE INDEX "trabajos_created_at_idx" ON "trabajos" USING btree ("created_at");
  CREATE INDEX "servicios_miembro_idx" ON "servicios" USING btree ("miembro_id");
  CREATE INDEX "servicios_updated_at_idx" ON "servicios" USING btree ("updated_at");
  CREATE INDEX "servicios_created_at_idx" ON "servicios" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_paginas_id_idx" ON "payload_locked_documents_rels" USING btree ("paginas_id");
  CREATE INDEX "payload_locked_documents_rels_planes_id_idx" ON "payload_locked_documents_rels" USING btree ("planes_id");
  CREATE INDEX "payload_locked_documents_rels_equipo_id_idx" ON "payload_locked_documents_rels" USING btree ("equipo_id");
  CREATE INDEX "payload_locked_documents_rels_trabajos_id_idx" ON "payload_locked_documents_rels" USING btree ("trabajos_id");
  CREATE INDEX "payload_locked_documents_rels_servicios_id_idx" ON "payload_locked_documents_rels" USING btree ("servicios_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "sitio_logo_idx" ON "sitio" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "paginas" CASCADE;
  DROP TABLE "planes_detalles" CASCADE;
  DROP TABLE "planes" CASCADE;
  DROP TABLE "equipo_conocimientos" CASCADE;
  DROP TABLE "equipo_educacion" CASCADE;
  DROP TABLE "equipo_experiencia" CASCADE;
  DROP TABLE "equipo" CASCADE;
  DROP TABLE "trabajos" CASCADE;
  DROP TABLE "servicios" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "sitio" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_planes_tipo";`)
}
