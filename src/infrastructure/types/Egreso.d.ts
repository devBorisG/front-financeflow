import {Usuario} from "./Usuario";
import {Categories} from "./Categories";

export interface Egreso {
    id: string,
    nombre: string,
    descripcion: string,
    monto: number,
    periodicidad: number,
    usuario: Usuario,
    categoria: Categories
}