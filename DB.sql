
CREATE TABLE "Role" (
    "Id" int   NOT NULL,
    "Nombre" string   NOT NULL,
    "Descripcion" string   NOT NULL,
    CONSTRAINT "pk_Role" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Usuario" (
    "Id" int   NOT NULL,
    "Correo" string   NOT NULL,
    "Contraseña" string   NOT NULL,
    "Role" int   NOT NULL,
    CONSTRAINT "pk_Usuario" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Caficultor" (
    "Id" int   NOT NULL,
    "Nombre" string   NOT NULL,
    "Apellidos" string   NOT NULL,
    "UsuarioID" int   NOT NULL,
    CONSTRAINT "pk_Caficultor" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Recolector" (
    "Id" int   NOT NULL,
    "CaficultorID" int   NOT NULL,
    "Name" string   NOT NULL,
    "Apellidos" string   NULL,
    "Identificacion" string   NULL,
    "Cel" number   NULL,
    CONSTRAINT "pk_Recolector" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Finca" (
    "Id" int   NOT NULL,
    "CaficultorID" int   NOT NULL,
    "Nombre" string   NOT NULL,
    "Ubicacion" string   NULL,
    "Descripcion" string   NULL,
    CONSTRAINT "pk_Finca" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "Zona" (
    "Id" int   NOT NULL,
    "FincaID" int   NOT NULL,
    "Nombre" string   NOT NULL,
    "Descripcion" string   NULL,
    CONSTRAINT "pk_Zona" PRIMARY KEY (
        "Id"
     ),
    CONSTRAINT "uc_Zona_Nombre" UNIQUE (
        "Nombre"
    )
);

CREATE TABLE "TipoRecoleccion" (
    "Id" int   NOT NULL,
    "Nombre" string   NOT NULL,
    CONSTRAINT "pk_TipoRecoleccion" PRIMARY KEY (
        "Id"
     ),
    CONSTRAINT "uc_TipoRecoleccion_Nombre" UNIQUE (
        "Nombre"
    )
);

CREATE TABLE "Periodo" (
    "Id" int   NOT NULL,
    "TipoRecoleccionID" int   NOT NULL,
    "Desde" date   NOT NULL,
    "Hasta" date   NOT NULL,
    "Value" money   NOT NULL,
    "Modificado" date   NOT NULL,
    "CaficultorID" int   NOT NULL,
    CONSTRAINT "pk_Periodo" PRIMARY KEY (
        "Id"
     )
);

CREATE TABLE "RegistroDeRecoleccion" (
    "Id" int   NOT NULL,
    "ZonaID" int   NOT NULL,
    "RecolectorID" int   NOT NULL,
    "PeriodoID" int   NOT NULL,
    "Cajuelas" int   NOT NULL,
    "Cuartillos" int   NOT NULL,
    "Creado" date   NOT NULL,
    "Modificado" date   NOT NULL,
    CONSTRAINT "pk_RegistroDeRecoleccion" PRIMARY KEY (
        "Id"
     )
);

ALTER TABLE "Usuario" ADD CONSTRAINT "fk_Usuario_Role" FOREIGN KEY("Role")
REFERENCES "Role" ("Id");

ALTER TABLE "Caficultor" ADD CONSTRAINT "fk_Caficultor_UsuarioID" FOREIGN KEY("UsuarioID")
REFERENCES "Usuario" ("Id");

ALTER TABLE "Recolector" ADD CONSTRAINT "fk_Recolector_CaficultorID" FOREIGN KEY("CaficultorID")
REFERENCES "Caficultor" ("Id");

ALTER TABLE "Finca" ADD CONSTRAINT "fk_Finca_CaficultorID" FOREIGN KEY("CaficultorID")
REFERENCES "Caficultor" ("Id");

ALTER TABLE "Zona" ADD CONSTRAINT "fk_Zona_FincaID" FOREIGN KEY("FincaID")
REFERENCES "Finca" ("Id");

ALTER TABLE "Periodo" ADD CONSTRAINT "fk_Periodo_TipoRecoleccionID" FOREIGN KEY("TipoRecoleccionID")
REFERENCES "TipoRecoleccion" ("Id");

ALTER TABLE "Periodo" ADD CONSTRAINT "fk_Periodo_CaficultorID" FOREIGN KEY("CaficultorID")
REFERENCES "Caficultor" ("Id");

ALTER TABLE "RegistroDeRecoleccion" ADD CONSTRAINT "fk_RegistroDeRecoleccion_ZonaID" FOREIGN KEY("ZonaID")
REFERENCES "Zona" ("Id");

ALTER TABLE "RegistroDeRecoleccion" ADD CONSTRAINT "fk_RegistroDeRecoleccion_RecolectorID" FOREIGN KEY("RecolectorID")
REFERENCES "Recolector" ("Id");

ALTER TABLE "RegistroDeRecoleccion" ADD CONSTRAINT "fk_RegistroDeRecoleccion_PeriodoID" FOREIGN KEY("PeriodoID")
REFERENCES "Periodo" ("Id");

