import {IngresoProps} from "../../../types/props/IngresoProps";
import {useState} from "react";
import {EditarIngreso} from "../../popup/income/EditarIngreso";

export const Incomes = ({ user, ingresoProps }: IngresoProps) => {
    if (ingresoProps.length === 0) {
        return <div className="no-content">No tienes ingresos registrados actualmente</div>;
    }else{
        return(
            ingresoProps.map((ingreso) => {
                const [edit, setEdit] = useState(false);

                const handleEditClick = () => {
                    setEdit(true);
                };

                // const handleDeleteClick = () => {
                //     const eliminarIngresoAPI = new EliminarIngresoAPI(ingreso.id);
                //     const response = eliminarIngresoAPI.eliminarIngreso();
                //     response.then((res) => {
                //         console.log(res.data.messages[0].level);
                //     }).catch((err) => {
                //         if (err.response.data.messages){
                //             console.log(err.response.data.messages[0].level);
                //             console.log(err.response.data.messages[0].content);
                //         }else {
                //             console.log(err);
                //         }
                //     });
                // };

                return (
                    <div key={ingreso.id}>
                        <div className="incomes">
                            <h1>{ingreso.nombre}</h1>
                            <p>{ingreso.descripcion}</p>
                            <p>{user ? user.nombre : null} {user ? user.apellido : null}</p>
                        </div>
                        <button className="income__button" onClick={handleEditClick}>Editar</button>
                        {edit ? <EditarIngreso ingreso={ingreso} setEdit={setEdit}/> : null}
                    </div>
                );
            }));
    }
}