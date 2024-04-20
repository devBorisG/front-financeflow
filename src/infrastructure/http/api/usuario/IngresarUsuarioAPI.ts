import { UsuarioAPIRoutes } from "../../routes/UsuarioAPIRoutes.ts";
import {UsuarioDTO} from "../../dto/UsuarioDTO.ts";
import {BackendResponse} from "../../../types/BackendResponse.ts";
import axios from "axios";

export class IngresarUsuarioAPI{
    private ingresar = UsuarioAPIRoutes.usuario.login;
    private readonly usuario: UsuarioDTO;
    constructor(usuarioDTO: UsuarioDTO) {
        this.usuario = usuarioDTO;
    }

    public async ingresarUsuario(): Promise<BackendResponse> {
        return await axios.post(this.ingresar, this.usuario);
    }
}