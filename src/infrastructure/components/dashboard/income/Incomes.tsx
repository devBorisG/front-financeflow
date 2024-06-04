import {IngresoProps} from "../../../types/props/IngresoProps";
import {useState} from "react";
import {EditarIngreso} from "../../popup/income/EditarIngreso";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const Incomes = ({ ingresoProps }: IngresoProps) => {
    const [edit, setEdit] = useState(false);
    if (ingresoProps.length === 0) {
        return <div className="no-content">No tienes ingresos registrados actualmente</div>;
    }else{
        return(
            ingresoProps.map((ingreso) => {

                const handleEditClick = () => {
                    setEdit(true);
                };
                const handleDeleteClick = () => {
                    console.log("delete")
                    // const eliminarIngresoAPI = new EliminarIngresoAPI(ingreso.id);
                    // const response = eliminarIngresoAPI.eliminarIngreso();
                    // response.then((res) => {
                    //     console.log(res.data.messages[0].level);
                    // }).catch((err) => {
                    //     if (err.response.data.messages){
                    //         console.log(err.response.data.messages[0].level);
                    //         console.log(err.response.data.messages[0].content);
                    //     }else {
                    //         console.log(err);
                    //     }
                    // });
                };

                return (
                    <div key={ingreso.id} className="income__card__container">
                        <FaEdit className="edit-icon" onClick={handleEditClick} />
                        <MdDelete className="delete-icon" onClick={handleDeleteClick} />
                        <div className="incomes">
                            <h1>{ingreso.nombre}</h1>
                            <p>{ingreso.descripcion}</p>
                            <p>Categoria: {ingreso.categoria.nombre}</p>
                        </div>
                        {edit ? <EditarIngreso ingreso={ingreso} setEdit={setEdit}/> : null}
                    </div>
                );
            }));
    }
}