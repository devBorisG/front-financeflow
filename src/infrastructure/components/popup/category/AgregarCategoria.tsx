import React from "react";
import { CategoriaDTO } from "../../../http/dto/CategoriaDTO";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import { CrearCategoriaAPI } from "../../../http/api/categoria/CrearCategoriaAPI";

interface CrateCategoriaComponentProps{
setCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setCategorias: React.Dispatch<React.SetStateAction<CategoriaDTO[]>>
}

export const AgregarCategoria = ({setCreate, setCategorias}: Readonly<CrateCategoriaComponentProps>) => {
    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");

    const handleAcceptClick = () => {
        setCreate(false);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = localStorage.getItem('user');
        if (user) {
            const crearCategoriaAPI = new CrearCategoriaAPI(new CategoriaDTO({
                id: '',
                nombre: nombre,
                descripcion: descripcion,
                usuarioDTO: new UsuarioDTO(JSON.parse(user))
            }));
            const response = crearCategoriaAPI.crearCategoria();
            response.then((res) => {
                console.log(res.data.data[0]);
                const newCategoria = res.data.data[0];
                setCategorias((categorias: CategoriaDTO[]) => [...categorias, newCategoria] as CategoriaDTO[]);
            }).catch((err) => {
                if (err.response.data.messages){
                    console.log(err.response.data.messages[0].level);
                    console.log(err.response.data.messages[0].content);
                } else {
                    console.log(err);
                }
            });
        }
        handleAcceptClick();
    }

    return (
        <div className="agregar-ingreso">
            <h1 className="agregar-ingreso__titulo">Agregar Categoria</h1>
            <form className="agregar-ingreso__formulario" onSubmit={handleSubmit}>
                <label className="agregar-ingreso__label">
                    Nombre:<input
                        className="agregar-ingreso__input"
                        type="text"
                        value={nombre}
                        name="nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        required={true}
                        onInvalid={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa el nombre de la categoría");
                        }}
                        onInput={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("");
                        }}/>
                </label>
                <label className="agregar-ingreso__label">
                    Descripción:<input
                        className="agregar-ingreso__input"
                        type="text"
                        value={descripcion}
                        name="descripcion"
                        required={true}
                        onChange={(e) => setDescripcion(e.target.value)}
                        onInvalid={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la descripción de la categoría");
                        }}
                        onInput={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("");
                        }}/>
                </label>
                <section className="usuario__buttons">
                    <button className="agregar-ingreso__button" type="submit">Aceptar</button>
                    <button className="usuario__button button__eliminar" onClick={handleAcceptClick}>Cancelar</button>
                </section>
            </form>
        </div>
    );
}