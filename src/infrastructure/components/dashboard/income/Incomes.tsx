import {IngresoProps} from "../../../types/props/IngresoProps";
import {useState} from "react";
import {EditarIngreso} from "../../popup/income/EditarIngreso";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactDOM from "react-dom";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import { IngresoDTO } from "../../../http/dto/IngresoDTO";
import { ConsultarIngresosAPI } from "../../../http/api/ingreso/ConsultarIngresosAPI";
import { EliminarIngresoAPI } from "../../../http/api/ingreso/EliminarIngresoAPI";

export const Incomes = ({ ingresoProps, setIngresos }: IngresoProps) => {
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    const handleIngresoUpdate = () => {
        let usuarioDTO: UsuarioDTO = new UsuarioDTO();
        const user = localStorage.getItem('user');
        if (user) {
            usuarioDTO = new UsuarioDTO(JSON.parse(user));
        }

        if (usuarioDTO?.id) {
            const ingresoAPI = new ConsultarIngresosAPI(usuarioDTO?.id);
            const response = ingresoAPI.consultarIngresos();
            response.then((res) => {
                const ingresoData = res.data.data.map((ingresoData: IngresoDTO) => {
                    const ingreso = new IngresoDTO();
                    ingreso.id = ingresoData.id;
                    ingreso.nombre = ingresoData.nombre;
                    ingreso.descripcion = ingresoData.descripcion;
                    ingreso.monto = ingresoData.monto;
                    ingreso.periodicidad = ingresoData.periodicidad;
                    ingreso.categoria = ingresoData.categoria;
                    return ingreso;
                });
                setIngresos(ingresoData);
            });
        }
    };

    if (ingresoProps.length === 0) {
        return <div className="no-content">No tienes ingresos registrados actualmente</div>;
    }else{
        return(
            ingresoProps.map((ingreso) => {

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
                    <div key={ingreso.id} className="income__card__container">
                        <FaEdit className="edit-icon" onClick={handleEditClick} />
                        <MdDelete className="delete-icon" onClick={handleDeleteClick} />
                        <div className="incomes">
                            <h1>{ingreso.nombre}</h1>
                            <p><b>Descripcion:</b> {ingreso.descripcion}</p>
                            <p><b>Categoria:</b> {ingreso.categoria.nombre}</p>
                        </div>
                        {edit && editId === ingreso.id ? <EditarIngreso ingreso={ingreso} setEdit={setEdit} onIngresoUpdated={handleIngresoUpdate}/> : null}
                        {edit && editId === ingreso.id ? ReactDOM.createPortal(<div className="usuario__overlay"></div>, document.body) : null}
                    </div>
                );
            }));
    }
}