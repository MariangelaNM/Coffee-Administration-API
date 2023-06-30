CREATE OR REPLACE FUNCTION IniciarSesion(
    p_correo VARCHAR,
    p_contrasena VARCHAR
) RETURNS BOOLEAN AS $$
DECLARE
    v_usuario_id INT;
BEGIN
    -- Buscar el ID del usuario basado en el correo y la contraseña proporcionados
    SELECT "Id" INTO v_usuario_id
    FROM "Usuario"
    WHERE "Correo" = p_correo AND "Contraseña" = p_contrasena;

    -- Verificar si se encontró un usuario con las credenciales ingresadas
    IF v_usuario_id IS NOT NULL THEN
        -- Realizar acciones adicionales o retornar verdadero para indicar un inicio de sesión exitoso
        -- Por ejemplo, podrías registrar información de inicio de sesión en una tabla de registros

        -- Aquí, simplemente devolvemos verdadero para indicar un inicio de sesión exitoso
        RETURN TRUE;
    ELSE
        -- Retornar falso si no se encontró un usuario con las credenciales ingresadas
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;
