import axios from "axios";
import { EgresoAPIRoutes } from "../../routes/EgresoAPIRoutes";
import { EgresoDTO } from "../../dto/EgresoDTO";
import { BackendResponse } from "../../../types/BackendResponse";

export class ActualizarEgresoAPI{
    private actualizar = EgresoAPIRoutes.egreso.actualizar;
    private readonly egresoDTO: EgresoDTO;
    constructor(egresoDTO: EgresoDTO) {
        this.egresoDTO = egresoDTO;
    }

    public async actualizarEgreso(): Promise<BackendResponse> {
        return await axios.put(this.actualizar, this.egresoDTO);
    }
}