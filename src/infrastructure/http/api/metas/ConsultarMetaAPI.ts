import { MetaAPIRoutes } from "../../routes/MetaAPIRoutes.ts"; 
import axios from "axios";

export class ConsultarMetaAPI{
    private consultar = MetaAPIRoutes.meta.consultar;
    private readonly usuarioUUID: string | undefined;

    constructor(usuarioUUID: string | undefined) {
        this.usuarioUUID = usuarioUUID;
    }

    public async consultarMeta() {
        return await axios.get(`${this.consultar}?id=${this.usuarioUUID}`);
    }
}