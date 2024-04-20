import {UsuarioDTO} from "../../http/dto/UsuarioDTO.ts";

export type IngresoProps = {
    user: UsuarioDTO | null;
    ingresoProps: IngresoTypes[];
}