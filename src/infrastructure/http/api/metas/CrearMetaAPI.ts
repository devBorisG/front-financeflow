import { MetaAPIRoutes } from "../../routes/MetaAPIRoutes.ts"; 
import { MetaDTO } from "../../dto/MetaDTO.ts";
import {BackendResponse} from "../../../types/BackendResponse.ts";
import axios from "axios";

export class CrearMetaAPI{
    private crear = MetaAPIRoutes.meta.crear;
    private readonly metaDTO: MetaDTO;

    constructor(metaDTO: MetaDTO) {
        this.metaDTO = metaDTO;
    }

    public async crearMeta(): Promise<BackendResponse> {
        return await axios.post(this.crear, this.metaDTO);
    }
}