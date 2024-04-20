import {UsuarioDTO} from "../../http/dto/UsuarioDTO.ts";

export type CategoriesProps = {
    user: UsuarioDTO | null;
    categoriesProps: CategoryTypes[];
}