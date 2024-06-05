import axios from "axios";
import {BackendResponse} from "../../../types/BackendResponse";
import { CategoriaAPIRoutes } from "../../routes/CategoriaAPIRoutes.ts";
import { CategoriaDTO } from "../../dto/CategoriaDTO.ts";

export class ActualizarCategoriaAPI {
    private actualizar = CategoriaAPIRoutes.categoria.actualizar;
    private readonly categoriaDTO: CategoriaDTO;
    constructor(categoriaDTO: CategoriaDTO) {
        this.categoriaDTO = categoriaDTO;
    }

    public async actualizarCategoria(): Promise<BackendResponse> {
        console.log(this.categoriaDTO);
        return await axios.put(this.actualizar, this.categoriaDTO);
    }
}