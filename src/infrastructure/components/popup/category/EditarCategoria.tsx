import ReactDOM from "react-dom";
import { ActualizarCategoriaAPI } from "../../../http/api/categoria/ActualizarCategoriaAPI";
import { CategoriaDTO } from "../../../http/dto/CategoriaDTO";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import React from "react";

export interface EditarCategoriaComponentProps {
    categoria: CategoriaDTO;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    onCategoriaUpdated: () => void;
}

export const EditarCategoria = ({ categoria, setEdit, onCategoriaUpdated }: Readonly<EditarCategoriaComponentProps>) => {
    const [nombre, setNombre] = React.useState(categoria.nombre);
    const [descripcion, setDescripcion] = React.useState(categoria.descripcion);

    const handleAcceptClick = () => {
        setEdit(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = localStorage.getItem('user');
        if (user) {
            const actualizarCategoriaAPI = new ActualizarCategoriaAPI(new CategoriaDTO({
                id: categoria.id,
                nombre: nombre,
                descripcion: descripcion,
                usuarioDTO: new UsuarioDTO(JSON.parse(user))
            }));
            const response = actualizarCategoriaAPI.actualizarCategoria();
            response.then((res) => {
                console.log(res.data.messages[0].level);
                onCategoriaUpdated();
            }).catch((err) => {
                if (err.response.data.messages) {
                    console.log(err.response.data.messages[0].level);
                    console.log(err.response.data.messages[0].content);
                } else {
                    console.log(err);
                }
            });
        }
        handleAcceptClick();
    };

    return ReactDOM.createPortal(
        <div className="editar-ingreso">
            <h1 className="editar-ingreso__titulo">Informacion</h1>
            <form className="editar-ingreso__formulario" onSubmit={handleSubmit}>
                <label className="editar-ingreso__label">
                    Nombre:<input
                    className="editar-ingreso__input"
                    type="text"
                    value={nombre}
                    name="nombre"
                    required={true}
                    onChange={(event) => setNombre(event.target.value)}
                    onInvalid={(event) => {
                        (event.target as HTMLInputElement).setCustomValidity('Por favor, ingresa el nombre')
                    }}/>
                </label>
                <label className="editar-ingreso__label">
                    Descripcion:<input
                    className="editar-ingreso__input"
                    type="text"
                    value={descripcion}
                    name="descripcion"
                    required={true}
                    onChange={(event) => setDescripcion(event.target.value)}
                    onInvalid={(event) => {
                        (event.target as HTMLInputElement).setCustomValidity('Por favor, ingresa la descripcion')
                    }}/>
                </label>
                <section className="usuario__buttons">
                    <button type="submit" className="editar-usuario__button">Aceptar</button>
                    <button type="button" className="usuario__button button__eliminar" onClick={handleAcceptClick}>Cancelar</button>
                </section>
            </form>
        </div>,
        document.body
    );
}