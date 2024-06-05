import axios from "axios";
import {BackendResponse} from "../../../types/BackendResponse";
import { CategoriaAPIRoutes } from "../../routes/CategoriaAPIRoutes.ts";

export class EliminarCategoriaAPI {
    private eliminar = CategoriaAPIRoutes.categoria.eliminar;
    private readonly categoriaUUID: string | undefined;

    constructor(categoriaUUID: string | undefined) {
        this.categoriaUUID = categoriaUUID;
    }

    public async eliminarCategoria(): Promise<BackendResponse> {
        return await axios.delete(`${this.eliminar}?id=${this.categoriaUUID}`);
    }
}