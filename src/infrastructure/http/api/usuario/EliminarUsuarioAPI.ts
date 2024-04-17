import axios from 'axios';
import { UsuarioAPIRoutes } from "../../routes/UsuarioAPIRoutes.ts";
import { BackendResponse } from "../../../types";

export class EliminarUsuarioAPI{
    private eliminar = UsuarioAPIRoutes.usuario.eliminar;
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public async eliminarUsuario(): Promise<BackendResponse> {
        return await axios.delete(`${this.eliminar}?id=${this.id}`);
    }
}