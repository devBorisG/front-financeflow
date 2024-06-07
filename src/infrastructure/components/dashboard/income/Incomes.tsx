import {IngresoProps} from "../../../types/props/IngresoProps";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import { IngresoDTO } from "../../../http/dto/IngresoDTO";
import { ConsultarIngresosAPI } from "../../../http/api/ingreso/ConsultarIngresosAPI";
import DataTable from "react-data-table-component";
import { ColumnsIngresoConfig } from "./ColumnsIngresoConfig";

export const Incomes = ({ ingresoProps, setIngresos }: IngresoProps) => {

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

    const columns = ColumnsIngresoConfig({handleIngresoUpdate});

    if (ingresoProps.length === 0) {
        return <div className="no-content">No tienes ingresos registrados actualmente</div>;
    }else{
        return(
            <div className="tabla-contenedor">
                <DataTable
                    columns={columns}
                    data={ingresoProps}
                    pagination
                />
            </div>
        )
    }
}