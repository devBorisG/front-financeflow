import { FaEdit } from "react-icons/fa";
import { ConsultarCategoriasAPI } from "../../http/api/categoria/ConsultarCategoriasAPI";
import { CategoriaDTO } from "../../http/dto/CategoriaDTO";
import { UsuarioDTO } from "../../http/dto/UsuarioDTO";
import {CategoriesProps} from "../../types/props/CategoriesProps";
import { MdDelete } from "react-icons/md";
import { EliminarCategoriaAPI } from "../../http/api/categoria/EliminarCategoriaAPI";
import { useState } from "react";
import { EditarCategoria } from "../popup/category/EditarCategoria";
import ReactDOM from "react-dom";

export const Categories = ({ categoriesProps, setCategorias }: CategoriesProps) => {
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    const handleCategoryUpdate = () => {
        let usuarioDTO: UsuarioDTO = new UsuarioDTO();
        const user = localStorage.getItem('user');
        if (user) {
            usuarioDTO = new UsuarioDTO(JSON.parse(user));
        }

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
    }

    if(categoriesProps.length === 0){
        return(
            <div className="no-content">
                No hay categorias registradas actualmente
            </div>
        );
    }else{
        return(
            categoriesProps.map((category) => {

                const handleEditClick = () => {
                    setEdit(true);
                    setEditId(category.id);
                };

                const handleDeleteClick = () => {
                    const categoryAPI = new EliminarCategoriaAPI(category.id);
                    const response = categoryAPI.eliminarCategoria();
                    response.then((res) => {
                        console.log(res.data.messages[0].level);
                        handleCategoryUpdate();
                    }).catch((err) => {
                        if (err.response.data.messages){
                            console.log(err.response.data.messages[0].level);
                            console.log(err.response.data.messages[0].content);
                        }else {
                            console.log(err);
                        }
                    });
                };

                return(
                    <div key={category.id} className="income__card__container">
                        <FaEdit className="edit-icon" onClick={handleEditClick} />
                        <MdDelete className="delete-icon" onClick={handleDeleteClick} />
                        <div className="categories">
                            <h1>{category.nombre}</h1>
                            <p><b>Descripcion:</b> {category.descripcion ? category.descripcion : "No hay descripcion"}</p>
                        </div>
                        {edit && editId === category.id ? <EditarCategoria categoria={category} setEdit={setEdit} onCategoriaUpdated={handleCategoryUpdate}/> : null}
                        {edit && editId === category.id ? ReactDOM.createPortal(<div className="usuario__overlay"></div>, document.body) : null}
                    </div>
                );
            }
        ));
    }
}