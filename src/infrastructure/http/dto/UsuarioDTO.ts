import {Usuario} from "../../types/Usuario";

export class UsuarioDTO implements Usuario{
    public id: string;
    public nombre: string;
    public apellido: string;
    public correo: string;
    public contrasena: string;

    constructor(usuario: UsuarioDTO) {
        this.id = usuario.id;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.correo = usuario.correo;
        this.contrasena = usuario.contrasena;
    }
}