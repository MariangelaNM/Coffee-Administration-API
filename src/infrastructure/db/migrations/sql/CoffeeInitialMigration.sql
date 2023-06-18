﻿CREATE TABLE "Roles" (
    "Id" integer   NOT NULL,
    "Nombre" character varying   NOT NULL,
    "Descripcion" character varying   NOT NULL,
    CONSTRAINT "pk_Role" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Usuarios" (
    "Id" integer   NOT NULL,
    "Correo" character varying   NOT NULL,
    "Contraseña" character varying   NOT NULL,
    "Role" integer   NOT NULL,
    CONSTRAINT "pk_Usuario" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Caficultores" (
    "Id" integer   NOT NULL,
    "Nombre" character varying   NOT NULL,
    "Apellidos" character varying   NOT NULL,
    "UsuarioID" integer   NOT NULL,
    CONSTRAINT "pk_Caficultor" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Recolectores" (
    "Id" integer   NOT NULL,
    "CaficultorID" integer   NOT NULL,
    "Name" character varying   NOT NULL,
    "Apellidos" character varying   NULL,
    "Identificacion" character varying   NULL,
    "Cel" integer   NULL,
    CONSTRAINT "pk_Recolector" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Fincas" (
    "Id" integer   NOT NULL,
    "CaficultorID" integer   NOT NULL,
    "Nombre" character varying   NOT NULL,
    "Ubicacion" character varying   NULL,
    "Descripcion" character varying   NULL,
    CONSTRAINT "pk_Finca" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Zonas" (
    "Id" integer   NOT NULL,
    "FincaID" integer   NOT NULL,
    "Nombre" character varying   NOT NULL,
    "Descripcion" character varying   NULL,
    CONSTRAINT "pk_Zona" PRIMARY KEY (
        "Id"
     ),
    CONSTRAINT "uc_Zona_Nombre" UNIQUE (
        "Nombre"
    )
);

CREATE TABLE "TipoRecoleccion" (
    "Id" integer   NOT NULL,
    "Nombre" character varying   NOT NULL,
    CONSTRAINT "pk_TipoRecoleccion" PRIMARY KEY (
        "Id"
     ),
    CONSTRAINT "uc_TipoRecoleccion_Nombre" UNIQUE (
        "Nombre"
    )
);

CREATE TABLE "Periodos" (
    "Id" integer   NOT NULL,
    "TipoRecoleccionID" integer   NOT NULL,
    "Desde" date   NOT NULL,
    "Hasta" date   NOT NULL,
    "Value" money   NOT NULL,
    "Modificado" date   NOT NULL,
    "CaficultorID" integer   NOT NULL,
    CONSTRAINT "pk_Periodo" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "RegistroDeRecoleccion" (
    "Id" integer   NOT NULL,
    "ZonaID" integer   NOT NULL,
    "RecolectorID" integer   NOT NULL,
    "PeriodoID" integer   NOT NULL,
    "Cajuelas" integer   NOT NULL,
    "Cuartillos" integer   NOT NULL,
    "Creado" date   NOT NULL,
    "Modificado" date   NOT NULL,
    CONSTRAINT "pk_RegistroDeRecoleccion" PRIMARY KEY (
        "Id"
     )
);

ALTER TABLE "Usuarios" ADD CONSTRAINT "fk_Usuario_Role" FOREIGN KEY("Role")
REFERENCES "Roles" ("Id");

ALTER TABLE "Caficultores" ADD CONSTRAINT "fk_Caficultor_UsuarioID" FOREIGN KEY("UsuarioID")
REFERENCES "Usuarios" ("Id");

ALTER TABLE "Recolectores" ADD CONSTRAINT "fk_Recolector_CaficultorID" FOREIGN KEY("CaficultorID")
REFERENCES "Caficultores" ("Id");

ALTER TABLE "Fincas" ADD CONSTRAINT "fk_Finca_CaficultorID" FOREIGN KEY("CaficultorID")
REFERENCES "Caficultores" ("Id");

ALTER TABLE "Zonas" ADD CONSTRAINT "fk_Zona_FincaID" FOREIGN KEY("FincaID")
REFERENCES "Fincas" ("Id");

ALTER TABLE "Periodos" ADD CONSTRAINT "fk_Periodo_TipoRecoleccionID" FOREIGN KEY("TipoRecoleccionID")
REFERENCES "TipoRecoleccion" ("Id");

ALTER TABLE "Periodos" ADD CONSTRAINT "fk_Periodo_CaficultorID" FOREIGN KEY("CaficultorID")
REFERENCES "Caficultores" ("Id");

ALTER TABLE "RegistroDeRecoleccion" ADD CONSTRAINT "fk_RegistroDeRecoleccion_ZonaID" FOREIGN KEY("ZonaID")
REFERENCES "Zonas" ("Id");

ALTER TABLE "RegistroDeRecoleccion" ADD CONSTRAINT "fk_RegistroDeRecoleccion_RecolectorID" FOREIGN KEY("RecolectorID")
REFERENCES "Recolectores" ("Id");

ALTER TABLE "RegistroDeRecoleccion" ADD CONSTRAINT "fk_RegistroDeRecoleccion_PeriodoID" FOREIGN KEY("PeriodoID")
REFERENCES "Periodos" ("Id");