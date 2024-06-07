import {Usuario} from "./Usuario";

export interface Meta {
    id: string,
    nombre: string,
    descripcion: string,
    fechaInicio: string,
    fechaFin: string,
    monto: number,
    usuario: Usuario,
}