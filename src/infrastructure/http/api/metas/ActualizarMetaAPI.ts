import { MetaAPIRoutes } from "../../routes/MetaAPIRoutes.ts"; 
import { MetaDTO } from "../../dto/MetaDTO.ts";
import {BackendResponse} from "../../../types/BackendResponse.ts";
import axios from "axios";

export class ActualizarMetaAPI{
    private actualizar = MetaAPIRoutes.meta.actualizar;
    private readonly metaDTO: MetaDTO;

    constructor(metaDTO: MetaDTO) {
        this.metaDTO = metaDTO;
    }

    public async actualizarMeta(): Promise<BackendResponse> {
        return await axios.put(this.actualizar, this.metaDTO);
    }
}