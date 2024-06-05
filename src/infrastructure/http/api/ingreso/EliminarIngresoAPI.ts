import {IngresoAPIRoutes} from "../../routes/IngresoAPIRoutes.ts";
import axios from "axios";
import {BackendResponse} from "../../../types/BackendResponse";

export class EliminarIngresoAPI {
    private eliminar = IngresoAPIRoutes.ingreso.eliminar;
    private readonly ingresoUUID: string | undefined;

    constructor(ingresoUUID: string | undefined) {
        this.ingresoUUID = ingresoUUID;
    }

    public async eliminarIngreso(): Promise<BackendResponse> {
        return await axios.delete(`${this.eliminar}?id=${this.ingresoUUID}`);
    }
}