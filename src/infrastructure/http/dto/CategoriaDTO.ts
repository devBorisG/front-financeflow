import {Categories} from "../../types/Categories";
import {UsuarioDTO} from "./UsuarioDTO.ts";

export class CategoriaDTO implements Categories{
    public id: string;
    public nombre: string;
    public descripcion: string;
    public usuarioDTO: UsuarioDTO;

    constructor(categoria?: Partial<CategoriaDTO>) {
        this.id = categoria?.id ?? '';
        this.nombre = categoria?.nombre ?? '';
        this.descripcion = categoria?.descripcion ?? '';
        this.usuarioDTO = categoria?.usuarioDTO || new UsuarioDTO();
    }
}