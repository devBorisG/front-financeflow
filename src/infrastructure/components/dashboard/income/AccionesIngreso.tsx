import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { EditarIngreso } from '../../popup/income/EditarIngreso';
import ReactDOM from 'react-dom';
import { IngresoDTO } from '../../../http/dto/IngresoDTO';
import { EliminarIngresoAPI } from '../../../http/api/ingreso/EliminarIngresoAPI';

interface AccionesIngresoProps {
    ingreso: IngresoDTO;
    handleIngresoUpdate: () => void;
}

export const AccionesIngreso: React.FC<AccionesIngresoProps> = ({ ingreso, handleIngresoUpdate }) => {
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");

    const handleEditClick = () => {
        setEdit(true);
        setEditId(ingreso.id);
    };

    const handleDeleteClick = () => {
        const ingresoAPI = new EliminarIngresoAPI(ingreso.id);
        const response = ingresoAPI.eliminarIngreso();
        response.then((res) => {
        console.log(res.data.messages[0].level);
        handleIngresoUpdate();
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
            {edit && editId === ingreso.id ? <EditarIngreso ingreso={ingreso} setEdit={setEdit} onIngresoUpdated={handleIngresoUpdate}/> : null}
            {edit && editId === ingreso.id ? ReactDOM.createPortal(<div className="usuario__overlay"></div>, document.body) : null}
        </div>
    );
};