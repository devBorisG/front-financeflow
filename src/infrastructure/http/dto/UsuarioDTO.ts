import { Usuario } from "../../types";

export class UsuarioDTO {
    public id: string;
    public nombre: string;
    public apellido: string;
    public correo: string;
    public contrasena: string;

    constructor(usuario: Usuario) {
        this.id = usuario.id;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.correo = usuario.correo;
        this.contrasena = usuario.contrasena;
    }
}