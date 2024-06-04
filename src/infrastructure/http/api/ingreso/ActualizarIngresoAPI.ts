import {IngresoAPIRoutes} from "../../routes/IngresoAPIRoutes.ts";
import axios from "axios";
import {IngresoDTO} from "../../dto/IngresoDTO.ts";
import {BackendResponse} from "../../../types/BackendResponse";

export class ActualizarIngresoAPI {
    private actualizar = IngresoAPIRoutes.ingreso.actualizar;
    private readonly ingresoDTO: IngresoDTO;
    constructor(ingresoDTO: IngresoDTO) {
        this.ingresoDTO = ingresoDTO;
    }

    public async actualizarIngreso(): Promise<BackendResponse> {
        return await axios.put(this.actualizar, this.ingresoDTO);
    }
}