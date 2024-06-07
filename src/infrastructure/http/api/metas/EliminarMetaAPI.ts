import axios from "axios";
import {BackendResponse} from "../../../types/BackendResponse";
import { MetaAPIRoutes } from "../../routes/MetaAPIRoutes.ts";

export class EliminarMetaAPI {
    private eliminar = MetaAPIRoutes.meta.eliminar;
    private readonly metaUUID: string | undefined;

    constructor(metaUUID: string | undefined) {
        this.metaUUID = metaUUID;
    }

    public async eliminarMeta(): Promise<BackendResponse> {
        return await axios.delete(`${this.eliminar}?id=${this.metaUUID}`);
    }
}