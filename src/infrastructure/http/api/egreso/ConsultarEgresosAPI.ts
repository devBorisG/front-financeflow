import axios from "axios";
import { EgresoAPIRoutes } from "../../routes/EgresoAPIRoutes";

export class ConsultarEgresosAPI {
    private consultar = EgresoAPIRoutes.egreso.consultar;
    private readonly usuarioUUID: string | undefined;

    constructor(usuarioUUID: string | undefined) {
        this.usuarioUUID = usuarioUUID;
    }
    async consultarEgresos() {
        return await axios.get(`${this.consultar}?id=${this.usuarioUUID}`);
    }
}