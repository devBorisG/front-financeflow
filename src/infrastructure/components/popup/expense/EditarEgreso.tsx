import React, { useEffect } from "react";
import { CategoriaDTO } from "../../../http/dto/CategoriaDTO";
import { EgresoDTO } from "../../../http/dto/EgresoDTO";
import { ConsultarCategoriasAPI } from "../../../http/api/categoria/ConsultarCategoriasAPI";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import { ActualizarEgresoAPI } from "../../../http/api/egreso/ActualizarEgresoAPI";
import ReactDOM from "react-dom";

export interface EditarEgresoComponentProps{
    egreso: EgresoDTO;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    onEgresoUpdated: () => void;
}

export const EditarEgreso = ({ egreso, setEdit, onEgresoUpdated }: Readonly<EditarEgresoComponentProps>) => {
    const [nombre, setNombre] = React.useState(egreso.nombre);
    const [descripcion, setDescripcion] = React.useState(egreso.descripcion);
    const [monto, setMonto] = React.useState(egreso.monto);
    const [periodicidad, setPeriodicidad] = React.useState(egreso.periodicidad);
    const [categoria, setCategoria] = React.useState<CategoriaDTO | undefined>(egreso.categoria);
    const [categorias, setCategorias] = React.useState<CategoriaDTO[]>([]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const consultarCategoriasAPI = new ConsultarCategoriasAPI(new UsuarioDTO(JSON.parse(user)).id);
            consultarCategoriasAPI.consultarCategorias().then(response => {
                setCategorias(response.data.data);
            });
        }
    }, []);

    const handleAcceptClick = () => {
        setEdit(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(!categoria){
            alert("Por favor, selecciona una categoría");
            return;
        }
        const user = localStorage.getItem('user');
        if (user) {
            const actualizarEgresoAPI = new ActualizarEgresoAPI(new EgresoDTO({
                id: egreso.id,
                nombre: nombre,
                descripcion: descripcion,
                monto: monto,
                periodicidad: periodicidad,
                usuario: new UsuarioDTO(JSON.parse(user)),
                categoria: categoria
            }));
            const response = actualizarEgresoAPI.actualizarEgreso();
            response.then((res) => {
                console.log(res.data.messages[0].level);
                onEgresoUpdated();
            }).catch((err) => {
                if (err.response.data.messages){
                    console.log(err.response.data.messages[0].level);
                    console.log(err.response.data.messages[0].content);
                }else {
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
                    onChange={e => setNombre(e.target.value)}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa el nombre");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="editar-ingreso__label">
                    Descripción:<input
                    className="editar-ingreso__input"
                    type="text"
                    value={descripcion}
                    name="descripcion"
                    required={true}
                    onChange={e => setDescripcion(e.target.value)}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la descripción");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="editar-ingreso__label">
                    Monto:<input
                    className="editar-ingreso__input"
                    type="number"
                    value={monto}
                    name="monto"
                    required={true}
                    onChange={e => setMonto(parseFloat(e.target.value))}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa el monto");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="editar-ingreso__label">
                    Periodicidad:<input
                    className="editar-ingreso__input"
                    type="number"
                    value={periodicidad}
                    name="periodicidad"
                    required={true}
                    onChange={e => setPeriodicidad(parseFloat(e.target.value))}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la periodicidad");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="editar-ingreso__label">
                    Categoría:<select
                        className="editar-ingreso__input"
                        value={categoria?.nombre}
                        name="categoria"
                        required={true}
                        onChange={e => {
                            const selectedCategoria = categorias.find(categoria => categoria.nombre === e.target.value);
                            setCategoria(selectedCategoria);
                        }}
                    >
                        {Array.isArray(categorias) && categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.nombre}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
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