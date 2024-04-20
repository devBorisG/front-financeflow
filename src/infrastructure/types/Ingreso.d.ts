import {Usuario} from "./Usuario";
import {Categories} from "./Categories";

export interface Ingreso {
    id: string,
    nombre: string,
    descripcion: string,
    monto: number,
    periodicidad: number,
    usuario: Usuario,
    categoria: Categories
}