import ReactDOM from "react-dom";
import { ActualizarMetaAPI } from "../../../http/api/metas/ActualizarMetaAPI";
import { MetaDTO } from "../../../http/dto/MetaDTO";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import React, { useEffect } from "react";

export interface EditarMetaComponentProps {
    meta: MetaDTO;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    onMetaUpdated: () => void;
}

export const EditarMeta = ({ meta, setEdit, onMetaUpdated }: Readonly<EditarMetaComponentProps>) => {
    const [nombre, setNombre] = React.useState(meta.nombre);
    const [descripcion, setDescripcion] = React.useState(meta.descripcion);
    const [monto, setMonto] = React.useState(meta.monto);
    const [fechaInicio, setFechaInicio] = React.useState(meta.fechaInicio);
    const [fechaFin, setFechaFin] = React.useState(meta.fechaFin);

    const handleAcceptClick = () => {
        setEdit(false);
    };

    useEffect(() => {
        if (fechaInicio) {
            const fechaInicioFormateada = new Date(fechaInicio).toISOString().split('T')[0];
            setFechaInicio(fechaInicioFormateada);
        }
        if (fechaFin) {
            const fechaFinFormateada = new Date(fechaFin).toISOString().split('T')[0];
            setFechaFin(fechaFinFormateada);
        }
    }, [fechaInicio, fechaFin]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = localStorage.getItem('user');
        if (user) {
            const actualizarMetaAPI = new ActualizarMetaAPI(new MetaDTO({
                id: meta.id,
                nombre: nombre,
                descripcion: descripcion,
                monto: monto,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                usuario: new UsuarioDTO(JSON.parse(user))
            }));
            const response = actualizarMetaAPI.actualizarMeta();
            response.then((res) => {
                console.log(res.data.messages[0].level);
                onMetaUpdated();
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
                        }} />
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
                        }} />
                </label>
                <label className="editar-ingreso__label">
                    Monto:<input
                        className="editar-ingreso__input"
                        type="number"
                        value={monto}
                        name="monto"
                        required={true}
                        onChange={(event) => setMonto(Number(event.target.value))}
                        onInvalid={(event) => {
                            (event.target as HTMLInputElement).setCustomValidity('Por favor, ingresa el monto')
                        }} />
                </label>
                <label className="editar-ingreso__label">
                    Fecha de Inicio:<input
                        className="editar-ingreso__input"
                        type="date"
                        value={fechaInicio}
                        name="fechaInicio"
                        required={true}
                        onChange={(event) => setFechaInicio(event.target.value)}
                        onInvalid={(event) => {
                            (event.target as HTMLInputElement).setCustomValidity('Por favor, ingresa la fecha de inicio')
                        }} />
                </label>
                <label className="editar-ingreso__label">
                    Fecha de Fin:<input
                        className="editar-ingreso__input"
                        type="date"
                        value={fechaFin}
                        name="fechaFin"
                        required={true}
                        onChange={(event) => setFechaFin(event.target.value)}
                        onInvalid={(event) => {
                            (event.target as HTMLInputElement).setCustomValidity('Por favor, ingresa la fecha de fin')
                        }} />
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