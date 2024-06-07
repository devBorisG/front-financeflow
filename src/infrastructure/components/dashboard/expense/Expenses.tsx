import { EgresoProps } from '../../../types/props/EgresoProps';
import { UsuarioDTO } from '../../../http/dto/UsuarioDTO';
import { ConsultarEgresosAPI } from '../../../http/api/egreso/ConsultarEgresosAPI';
import { EgresoDTO } from '../../../http/dto/EgresoDTO';
import DataTable from 'react-data-table-component';
import { ColumnsEgresoConfig } from './ColumnsEgresoConfig';

export const Expenses = ({egresoProps, setEgresos}: EgresoProps) => {

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

    const columns = ColumnsEgresoConfig({handleEgresoUpdate});

    if (egresoProps.length === 0) {
        return <div className="no-content">No tienes egresos registrados actualmente</div>;
    }else{
        return(
            <div>
                <DataTable
                    columns={columns}
                    data={egresoProps}
                    pagination
                />
            </div>
        );
    }
}