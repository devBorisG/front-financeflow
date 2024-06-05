import {Usuario} from "./Usuario";

export interface Categories{
    id: string,
    nombre: string,
    descripcion: string,
    usuarioDTO: Usuario
}