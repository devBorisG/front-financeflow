import axios from "axios";
import { EgresoAPIRoutes } from "../../routes/EgresoAPIRoutes";

export class EliminarEgresoAPI {
    private eliminar = EgresoAPIRoutes.egreso.eliminar;
    private readonly egresoUUID: string | undefined;

    constructor(egresoUUID: string | undefined) {
        this.egresoUUID = egresoUUID;
    }
    async eliminarEgreso() {
        return await axios.delete(`${this.eliminar}?id=${this.egresoUUID}`);
    }
}