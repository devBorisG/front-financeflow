import axios from "axios";
import {CategoriaAPIRoutes} from "../../routes/CategoriaAPIRoutes.ts";

export class ConsultarCategoriasAPI {
    private consultar = CategoriaAPIRoutes.categoria.consultar;
    private readonly usuarioUUID: string | undefined;

    constructor(usuarioUUID: string | undefined) {
        this.usuarioUUID = usuarioUUID;
    }
    public async consultarCategorias() {
        return await axios.get(`${this.consultar}?id=${this.usuarioUUID}`);
    }
}