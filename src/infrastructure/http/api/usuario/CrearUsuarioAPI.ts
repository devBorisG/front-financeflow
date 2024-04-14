import axios from 'axios';
import { UsuarioDTO } from "../../dto/UsuarioDTO.ts";
import { UsuarioAPIRoutes } from "../../routes/UsuarioAPIRoutes.ts";
import { BackendResponse } from "../../../types";

export class CrearUsuarioAPI {
    private registrar = UsuarioAPIRoutes.usuario.registrar;
    private readonly usuario: UsuarioDTO;
    constructor(usuarioDTO: UsuarioDTO) {
        this.usuario = usuarioDTO;
    }
    public async crearUsuario(): Promise<BackendResponse> {
        return await axios.post(this.registrar, this.usuario);
    }
}