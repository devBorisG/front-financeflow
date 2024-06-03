import { IngresoAPIRoutes } from '../../routes/IngresoAPIRoutes.ts';
import axios from "axios";

export class ConsultarIngresosAPI {
    private consultar = IngresoAPIRoutes.ingreso.consultar;
    private readonly usuarioUUID: string | undefined;

    constructor(usuarioUUID: string | undefined) {
        this.usuarioUUID = usuarioUUID;
    }
    async consultarIngresos() {
        return await axios.get(`${this.consultar}?id=${this.usuarioUUID}`);
    }
}