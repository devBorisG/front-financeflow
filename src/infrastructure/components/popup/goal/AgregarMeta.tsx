import React from "react";
import { CrearMetaAPI } from "../../../http/api/metas/CrearMetaAPI";
import { MetaDTO } from "../../../http/dto/MetaDTO";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";

interface CreateMetaComponentProps {
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setMetas: React.Dispatch<React.SetStateAction<MetaDTO[]>>;
}

export const AgregarMeta = ({ setCreate, setMetas }: Readonly<CreateMetaComponentProps>) => {
    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [monto, setMonto] = React.useState(0);
    const [fechaInicio, setFechaInicio] = React.useState("");
    const [fechaFin, setFechaFin] = React.useState("");

    const handleAcceptClick = () => {
        setCreate(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = localStorage.getItem('user');
        if (user) {
            const crearMetaAPI = new CrearMetaAPI(new MetaDTO({
                id: '',
                nombre: nombre,
                descripcion: descripcion,
                monto: monto,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                usuario: new UsuarioDTO(JSON.parse(user))
            }));
            const response = crearMetaAPI.crearMeta();
            response.then((res) => {
                console.log(res.data.data[0]);
                const newMeta = res.data.data[0];
                setMetas((metas: MetaDTO[]) => [...metas, newMeta] as MetaDTO[]);
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
    }

    return (
        <div className="agregar-ingreso">
            <h1 className="agregar-ingreso__titulo">Agregar Meta</h1>
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
                            (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa el nombre de la meta");
                        }}
                    />
                </label>
                <label className="agregar-ingreso__label">
                    Descripcion:<input
                        className="agregar-ingreso__input"
                        type="text"
                        value={descripcion}
                        name="descripcion"
                        onChange={(e) => setDescripcion(e.target.value)}
                        required={true}
                        onInvalid={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la descripcion de la meta");
                        }}
                    />
                </label>
                <label className="agregar-ingreso__label">
                    Monto:<input
                        className="agregar-ingreso__input"
                        type="number"
                        value={monto}
                        name="monto"
                        onChange={(e) => setMonto(parseInt(e.target.value))}
                        required={true}
                        onInvalid={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa el monto de la meta");
                        }}
                    />
                </label>
                <label className="agregar-ingreso__label">
                    Fecha Inicio:<input
                        className="agregar-ingreso__input"
                        type="date"
                        value={fechaInicio}
                        name="fechaInicio"
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required={true}
                        onInvalid={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la fecha de inicio de la meta");
                        }}
                    />
                </label>
                <label className="agregar-ingreso__label">
                    Fecha Fin:<input
                        className="agregar-ingreso__input"
                        type="date"
                        value={fechaFin}
                        name="fechaFin"
                        onChange={(e) => setFechaFin(e.target.value)}
                        required={true}
                        onInvalid={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa la fecha de fin de la meta");
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