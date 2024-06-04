import { ConsultarCategoriasAPI } from "../../../http/api/categoria/ConsultarCategoriasAPI";
import { ActualizarIngresoAPI } from "../../../http/api/ingreso/ActualizarIngresoAPI";
import { IngresoDTO } from "../../../http/dto/IngresoDTO";
import React, { useEffect } from "react";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import { CategoriaDTO } from "../../../http/dto/CategoriaDTO";

export interface EditarIngresoComponentProps{
    ingreso: IngresoDTO;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditarIngreso = ({ ingreso, setEdit }: Readonly<EditarIngresoComponentProps>) => {
    const [nombre, setNombre] = React.useState(ingreso.nombre);
    const [descripcion, setDescripcion] = React.useState(ingreso.descripcion);
    const [monto, setMonto] = React.useState(ingreso.monto);
    const [periodicidad, setPeriodicidad] = React.useState(ingreso.periodicidad);
    const [categoria, setCategoria] = React.useState<CategoriaDTO | undefined>(ingreso.categoria);
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
            const actualizarIngresoAPI = new ActualizarIngresoAPI(new IngresoDTO({
                id: ingreso.id,
                nombre: nombre,
                descripcion: descripcion,
                monto: monto,
                periodicidad: periodicidad,
                usuario: new UsuarioDTO(JSON.parse(user)),
                categoria: categoria
            }));
            const response = actualizarIngresoAPI.actualizarIngreso();
            response.then((res) => {
                console.log(res.data.messages[0].level);
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
    }

    return (
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
            </form>
        </div>
    );
}