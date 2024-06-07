import { Egreso } from "../../types/Egreso";
import { CategoriaDTO } from "./CategoriaDTO";
import { UsuarioDTO } from "./UsuarioDTO";

export class EgresoDTO implements Egreso{
    public id: string;
    public nombre: string;
    public descripcion: string;
    public monto: number;
    public periodicidad: number;
    public usuario: UsuarioDTO;
    public categoria: CategoriaDTO;

    constructor(egreso?: Partial<EgresoDTO>) {
        this.id = egreso?.id ?? '';
        this.nombre = egreso?.nombre ?? '';
        this.descripcion = egreso?.descripcion ?? '';
        this.monto = egreso?.monto ?? 0;
        this.periodicidad = egreso?.periodicidad ?? 0;
        this.usuario = egreso?.usuario || new UsuarioDTO();
        this.categoria = egreso?.categoria || new CategoriaDTO();
    }
}