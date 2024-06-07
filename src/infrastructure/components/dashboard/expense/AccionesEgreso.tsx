import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { EgresoDTO } from '../../../http/dto/EgresoDTO'; // Asegúrate de importar EgresoDTO correctamente
import { EliminarEgresoAPI } from '../../../http/api/egreso/EliminarEgresoAPI';
import { EditarIngreso } from '../../popup/income/EditarIngreso';
import ReactDOM from 'react-dom';

interface AccionesEgresoProps {
    egreso: EgresoDTO;
    handleEgresoUpdate: () => void;
}

export const AccionesEgreso: React.FC<AccionesEgresoProps> = ({ egreso, handleEgresoUpdate }) => {
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");

    const handleEditClick = () => {
        setEdit(true);
        setEditId(egreso.id);
    };

    const handleDeleteClick = () => {
        const egresoAPI = new EliminarEgresoAPI(egreso.id);
        const response = egresoAPI.eliminarEgreso();
        response.then((res) => {
        console.log(res.data.messages[0].level);
        handleEgresoUpdate();
        }).catch((err) => {
        if (err.response.data.messages){
            console.log(err.response.data.messages[0].level);
            console.log(err.response.data.messages[0].content);
        }else {
            console.log(err);
        }
        });
    };

    return (
        <div>
            <FaEdit className="edit-icon icon-table" onClick={handleEditClick} />
            <MdDelete className="delete-icon icon-table" onClick={handleDeleteClick} />
            {edit && editId === egreso.id ? <EditarIngreso ingreso={egreso} setEdit={setEdit} onIngresoUpdated={handleEgresoUpdate}/> : null}
            {edit && editId === egreso.id ? ReactDOM.createPortal(<div className="usuario__overlay"></div>, document.body) : null}
        </div>
    );
};