import {IngresoAPIRoutes} from "../../routes/IngresoAPIRoutes.ts";
import axios from "axios";
import {IngresoDTO} from "../../dto/IngresoDTO.ts";
import {BackendResponse} from "../../../types/BackendResponse";

export class CrearIngresoAPI {
    private crear = IngresoAPIRoutes.ingreso.crear;
    private readonly ingresoDTO: IngresoDTO;
    constructor(ingresoDTO: IngresoDTO) {
        this.ingresoDTO = ingresoDTO;
    }

    public async crearIngreso(): Promise<BackendResponse> {
        return await axios.post(this.crear, this.ingresoDTO);
    }
}