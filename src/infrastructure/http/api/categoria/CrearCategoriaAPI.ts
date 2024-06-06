import axios from "axios";
import {BackendResponse} from "../../../types/BackendResponse";
import { CategoriaAPIRoutes } from "../../routes/CategoriaAPIRoutes.ts";
import { CategoriaDTO } from "../../dto/CategoriaDTO.ts";

export class CrearCategoriaAPI {
    private crear = CategoriaAPIRoutes.categoria.crear;
    private readonly categoriaDTO: CategoriaDTO;
    constructor(categoriaDTO: CategoriaDTO) {
        this.categoriaDTO = categoriaDTO;
    }

    public async crearCategoria(): Promise<BackendResponse> {
        return await axios.post(this.crear, this.categoriaDTO);
    }
}