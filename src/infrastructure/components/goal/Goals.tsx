import { FaEdit } from "react-icons/fa";
import { ConsultarMetaAPI } from "../../http/api/metas/ConsultarMetaAPI";
import { EliminarMetaAPI } from "../../http/api/metas/EliminarMetaAPI";
import { MetaDTO } from "../../http/dto/MetaDTO";
import { UsuarioDTO } from "../../http/dto/UsuarioDTO";
import { MetaProps } from "../../types/props/MetaProps";
import { MdDelete } from "react-icons/md";
import { EditarMeta } from "../popup/goal/EditarMeta";
import ReactDOM from "react-dom";
import { useState } from "react";

export const Goals = ({ metaProps, setMeta }: MetaProps) => {
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");

    const handleMetaUpdate = () => {
        let usuarioDTO: UsuarioDTO = new UsuarioDTO();
        const user = localStorage.getItem('user');
        if (user) {
            usuarioDTO = new UsuarioDTO(JSON.parse(user));
        }

        if (usuarioDTO?.id) {
            const consultarMetasAPI = new ConsultarMetaAPI(usuarioDTO?.id);
            const response = consultarMetasAPI.consultarMeta();
            response.then((res) => {
                const metaData = res.data.data.map((metaData: MetaDTO) => {
                    const meta = new MetaDTO();
                    meta.id = metaData.id;
                    meta.descripcion = metaData.descripcion;
                    meta.nombre = metaData.nombre;
                    meta.fechaInicio = metaData.fechaInicio;
                    meta.fechaFin = metaData.fechaFin;
                    return meta;
                });
                setMeta(metaData);
            });
        }
    }

    if(metaProps.length === 0){
        return(
            <div className="no-content">
                No hay metas registradas actualmente
            </div>
        );
    }else{
        return(
            metaProps.map((meta) => {

                const handleEditClick = () => {
                    setEdit(true);
                    setEditId(meta.id);
                };

                const handleDeleteClick = () => {
                    const metaAPI = new EliminarMetaAPI(meta.id);
                    const response = metaAPI.eliminarMeta();
                    response.then((res) => {
                        console.log(res.data.messages[0].level);
                        handleMetaUpdate();
                    }).catch((err) => {
                        if (err.response.data.messages){
                            console.log(err.response.data.messages[0].level);
                            console.log(err.response.data.messages[0].content);
                        } else {
                            console.log(err);
                        }
                    });
                };

                return(
                    <div key={meta.id} className="income__card__container">
                        <FaEdit className="edit-icon" onClick={handleEditClick} />
                        <MdDelete className="delete-icon" onClick={handleDeleteClick} />
                        <div className="categories">
                            <h1>{meta.nombre}</h1>
                            <p><b>Descripcion:</b> {meta.descripcion ? meta.descripcion : "No hay descripcion"}</p>
                            <p><b>Monto:</b> {meta.monto.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}</p>
                            <p><b>Fecha de inicio:</b> {new Date(meta.fechaInicio).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p><b>Fecha de fin:</b> {meta.fechaFin ? new Date(meta.fechaFin).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                        </div>
                        {edit && editId === meta.id ? <EditarMeta meta={meta} setEdit={setEdit} onMetaUpdated={handleMetaUpdate}/> : null}
                        {edit && editId === meta.id ? ReactDOM.createPortal(<div className="usuario__overlay"></div>, document.body) : null}
                    </div>
                );
            })
        );
    }
}