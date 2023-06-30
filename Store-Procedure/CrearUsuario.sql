CREATE OR REPLACE FUNCTION GuardarLogin(
    correo VARCHAR,
    contrasena VARCHAR,
    nombre VARCHAR,
    apellidos VARCHAR,
	role_id int
) RETURNS VOID AS $$
DECLARE
    v_usuario_id INT;
BEGIN

    -- Insertar el nuevo usuario en la tabla "Usuario"
    INSERT INTO "Usuario" ("Correo", "Contraseña", "Role")
    VALUES (correo, contrasena, role_id)
    RETURNING "Id" INTO v_usuario_id;

    -- Insertar el nuevo caficultor en la tabla "Caficultor"
    INSERT INTO "Caficultor" ("Nombre", "Apellidos", "UsuarioID")
    VALUES (nombre, apellidos, usuario_id);

    -- Confirmar la transacción
    COMMIT;
END;
$$ LANGUAGE plpgsql;
