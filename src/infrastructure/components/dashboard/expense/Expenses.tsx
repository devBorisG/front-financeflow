import { useState } from 'react';
import { EgresoProps } from '../../../types/props/EgresoProps';
import { UsuarioDTO } from '../../../http/dto/UsuarioDTO';
import { ConsultarEgresosAPI } from '../../../http/api/egreso/ConsultarEgresosAPI';
import { EgresoDTO } from '../../../http/dto/EgresoDTO';
import { EliminarEgresoAPI } from '../../../http/api/egreso/EliminarEgresoAPI';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ReactDOM from 'react-dom';
import { EditarEgreso } from '../../popup/expense/EditarEgreso';

export const Expenses = ({egresoProps, setEgresos}: EgresoProps) => {
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    const handleEgresoUpdate = () => {
        let usuarioDTO: UsuarioDTO = new UsuarioDTO();
        const user = localStorage.getItem('user');
        if (user) {
            usuarioDTO = new UsuarioDTO(JSON.parse(user));
        }

        if (usuarioDTO?.id) {
            const egresoAPI = new ConsultarEgresosAPI(usuarioDTO?.id);
            const response = egresoAPI.consultarEgresos();
            response.then((res) => {
                const egresoData = res.data.data.map((egresoData: EgresoDTO) => {
                    const egreso = new EgresoDTO();
                    egreso.id = egresoData.id;
                    egreso.nombre = egresoData.nombre;
                    egreso.descripcion = egresoData.descripcion;
                    egreso.monto = egresoData.monto;
                    egreso.periodicidad = egresoData.periodicidad;
                    egreso.categoria = egresoData.categoria;
                    return egreso;
                });
                setEgresos(egresoData);
            });
        }
    };

    if (egresoProps.length === 0) {
        return <div className="no-content">No tienes egresos registrados actualmente</div>;
    }else{
        return(
            egresoProps.map((egreso) => {

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
                    <div key={egreso.id} className="income__card__container">
                        <FaEdit className="edit-icon" onClick={handleEditClick} />
                        <MdDelete className="delete-icon" onClick={handleDeleteClick} />
                        <div className="incomes">
                            <h1>{egreso.nombre}</h1>
                            <p>{egreso.descripcion}</p>
                            <p>Categoria: {egreso.categoria.nombre}</p>
                        </div>
                        {edit && editId === egreso.id ? <EditarEgreso egreso={egreso} setEdit={setEdit} onEgresoUpdated={handleEgresoUpdate}/> : null}
                        {edit && editId === egreso.id ? ReactDOM.createPortal(<div className="usuario__overlay"></div>, document.body) : null}
                    </div>
                );
            })
        );
    }
}