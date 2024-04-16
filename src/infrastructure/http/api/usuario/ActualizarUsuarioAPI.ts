import { UsuarioAPIRoutes } from "../../routes/UsuarioAPIRoutes.ts";
import {UsuarioDTO} from "../../dto/UsuarioDTO.ts";
import {BackendResponse} from "../../../types";
import axios from "axios";

export class ActualizarUsuarioAPI{
    private actualizar = UsuarioAPIRoutes.usuario.actualizar;
    private readonly usuario: UsuarioDTO;

    constructor(usuarioDTO: UsuarioDTO) {
        this.usuario = usuarioDTO;
    }

    public async actualizarUsuario(): Promise<BackendResponse> {
        return await axios.put(this.actualizar, this.usuario);
    }
}