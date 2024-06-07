import { Meta } from "../../types/Meta";
import { UsuarioDTO } from "./UsuarioDTO";

export class MetaDTO implements Meta {
    public id: string;
    public nombre: string;
    public descripcion: string;
    public fechaInicio: string;
    public fechaFin: string;
    public monto: number;
    public usuario: UsuarioDTO;

    constructor(meta?: Partial<MetaDTO>) {
        this.id = meta?.id ?? '';
        this.nombre = meta?.nombre ?? '';
        this.descripcion = meta?.descripcion ?? '';
        this.fechaInicio = (meta?.fechaInicio?? '')+'T00:00:00';
        this.fechaFin = (meta?.fechaFin ?? '')+'T00:00:00';
        this.monto = meta?.monto ?? 0;
        this.usuario = meta?.usuario ?? new UsuarioDTO();
    }
}