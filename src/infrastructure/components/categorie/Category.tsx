import {Header} from "../Header.tsx";
import {Categories} from "./Categories.tsx";
import { useEffect, useState} from "react";
import { UsuarioDTO } from "../../http/dto/UsuarioDTO.ts";
import { ConsultarCategoriasAPI } from "../../http/api/categoria/ConsultarCategoriasAPI.ts";
import { CategoriaDTO } from "../../http/dto/CategoriaDTO.ts";
import { AgregarCategoria } from "../popup/category/AgregarCategoria.tsx";

export function Category(){
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    const [search, setSearch] = useState("");
    const [create, setCreate] = useState(false);

    const handleCreateClick = () => {
        setCreate(true);
    };

    let usuarioDTO: UsuarioDTO = new UsuarioDTO();
    const user = localStorage.getItem('user');
    if (user) {
        usuarioDTO = new UsuarioDTO(JSON.parse(user));
    }

    useEffect(() => {
        if (usuarioDTO?.id) {
            const consultarCategoriasAPI = new ConsultarCategoriasAPI(usuarioDTO?.id);
            const response = consultarCategoriasAPI.consultarCategorias();
            response.then((res) => {
                const categoriaData = res.data.data.map((categoriaData: CategoriaDTO) => {
                    const categoria = new CategoriaDTO();
                    categoria.id = categoriaData.id;
                    categoria.descripcion = categoriaData.descripcion;
                    categoria.nombre = categoriaData.nombre;
                    return categoria;
                });
                setCategorias(categoriaData);
            });
        }
    }, [user, usuarioDTO?.id]);

    return(
        <div>
            <Header />
            <div className="category__container">
                <h2 className="categoria__titulo">Categorías</h2>
                <section className="categorymanagement">
                    <div className="categoria__acciones">
                        <button className="categoria__boton" onClick={handleCreateClick}>Agregar</button>
                        <input
                            className="categoria__buscador"
                            type="text"
                            placeholder="Buscar una categoria..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </section>
                <div className="category">
                    <Categories categoriesProps={categorias} setCategorias={setCategorias}/>
                </div>
                {create ? <AgregarCategoria setCreate={setCreate} setCategorias={setCategorias}/> : null}
                {create ? <div className="usuario__overlay"></div> : null}
            </div>
        </div>
    );
}