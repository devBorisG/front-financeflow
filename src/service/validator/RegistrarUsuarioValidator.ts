import {UsuarioDTO} from "../../infrastructure/http/dto/UsuarioDTO.ts";

export function RegistrarUsuarioValidator(usuario: UsuarioDTO, confirmContrasena: string) {
    if (usuario.nombre === "") {
        return "El nombre no puede estar vacío";
    }
    if (usuario.apellido === "") {
        return "El apellido no puede estar vacío";
    }
    if (usuario.correo === "") {
        return "El correo no puede estar vacío";
    }
    if (usuario.contrasena === "") {
        return "La contraseña no puede estar vacía";
    }
    if (usuario.contrasena !== confirmContrasena) {
        return "Las contraseñas no coinciden";
    }
    return "";
}