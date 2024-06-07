import { EgresoDTO } from "../../../http/dto/EgresoDTO";
import React, { useEffect } from "react";
import { CategoriaDTO } from "../../../http/dto/CategoriaDTO";
import { ConsultarCategoriasAPI } from "../../../http/api/categoria/ConsultarCategoriasAPI";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import { CrearEgresoAPI } from "../../../http/api/egreso/CrearEgresoAPI";

interface CrearEgresoComponentProps{
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setEgresos: React.Dispatch<React.SetStateAction<EgresoDTO[]>>
}

export const AgregarEgreso = ({setCreate, setEgresos}: Readonly<CrearEgresoComponentProps>) => {
    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [monto, setMonto] = React.useState(0);
    const [periodicidad, setPeriodicidad] = React.useState(0);
    const [categoria, setCategoria] = React.useState<CategoriaDTO | undefined >(undefined);
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
        setCreate(false);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(!categoria){
            alert("Por favor, selecciona una categoría");
            return;
        }
        const user = localStorage.getItem('user');
        if (user) {
            const crearEgresoAPI = new CrearEgresoAPI(new EgresoDTO({
                id: '',
                nombre: nombre,
                descripcion: descripcion,
                monto: monto,
                periodicidad: periodicidad,
                usuario: new UsuarioDTO(JSON.parse(user)),
                categoria: categoria
            }));
            const response = crearEgresoAPI.crearEgreso();
            response.then((res) => {
                console.log(res.data.data[0]);
                const newEgreso = res.data.data[0];
                setEgresos((egresos: EgresoDTO[]) => [...egresos, newEgreso] as EgresoDTO[]);
            }).catch((err) => {
                if (err.response.data.messages){
                    console.log(err.response.data.messages[0].level);
                    console.log(err.response.data.messages[0].content);
                }else{
                    console.log(err);
                }
            });
        }
        handleAcceptClick();
    };

    return (
        <div className="agregar-ingreso">
            <h1 className="agregar-ingreso__titulo">Agregar Egreso</h1>
            <form className="agregar-ingreso__formulario" onSubmit={handleSubmit}>
                <label className="agregar-ingreso__label">
                    Nombre:<input
                    className="agregar-ingreso__input"
                    type="text"
                    value={nombre}
                    name="nombre"
                    required={true}
                    onChange={e => setNombre(e.target.value)}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa el nombre del ingreso");
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
                    onChange={e => setDescripcion(e.target.value)}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la descripción del ingreso");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="agregar-ingreso__label">
                    Monto:<input
                    className="agregar-ingreso__input"
                    type="number"
                    value={monto}
                    name="monto"
                    required={true}
                    onChange={e => setMonto(parseFloat(e.target.value))}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa el monto del ingreso");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="agregar-ingreso__label">
                    Periodicidad:<input
                    className="agregar-ingreso__input"
                    type="number"
                    value={periodicidad}
                    name="periodicidad"
                    required={true}
                    onChange={e => setPeriodicidad(parseFloat(e.target.value))}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la periodicidad del ingreso");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="agregar-ingreso__label">
                    Categoría:<select
                    className="agregar-ingreso__input"
                    value={categoria?.nombre}
                    name="categoria"
                    required={true}
                    onChange={e => {
                        const selectedCategoria = categorias.find(categoria => categoria.nombre === e.target.value);
                        setCategoria(selectedCategoria)
                    }}
                >
                    <option value="" disabled selected>Seleccionar categoría</option>
                    {Array.isArray(categorias) && categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                </label>
                <section className="usuario__buttons">
                    <button type="submit" className="agregar-ingreso__button">Aceptar</button>
                    <button className="usuario__button button__eliminar" onClick={handleAcceptClick}>Cancelar</button>
                </section>
            </form>
        </div>
    )
}