import {Ingreso} from "../../types/Ingreso";
import {UsuarioDTO} from "./UsuarioDTO.ts";
import {CategoriaDTO} from "./CategoriaDTO.ts";

export class IngresoDTO implements Ingreso{
    public id: string;
    public nombre: string;
    public descripcion: string;
    public monto: number;
    public periodicidad: number;
    public usuario: UsuarioDTO;
    public categoria:CategoriaDTO;

    constructor(ingreso: IngresoDTO) {
        this.id = ingreso.id;
        this.nombre = ingreso.nombre;
        this.descripcion = ingreso.descripcion;
        this.monto = ingreso.monto;
        this.periodicidad = ingreso.periodicidad;
        this.usuario = ingreso.usuario;
        this.categoria = ingreso.categoria;
    }
}