import { useEffect, useState } from "react";
import { EgresoDTO } from "../../../http/dto/EgresoDTO";
import { UsuarioDTO } from "../../../http/dto/UsuarioDTO";
import { ConsultarEgresosAPI } from "../../../http/api/egreso/ConsultarEgresosAPI";
import { Expenses } from "./Expenses";
import { AgregarEgreso } from "../../popup/expense/AgregarEgreso";

export function Expense() {
    const [egresos, setEgresos] = useState<EgresoDTO[]>([]);
    const [create, setCreate] = useState(false);

    const handleCreateClick = () => {
        setCreate(true);
    }

    let usuarioDTO: UsuarioDTO = new UsuarioDTO();
    const user = localStorage.getItem('user');
    if (user) {
        usuarioDTO = new UsuarioDTO(JSON.parse(user));
    }

    useEffect(() => {
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
    }, [user, usuarioDTO?.id]);

    return (
        <div className="income__container">
            <h2 className="income__titulo">Egresos</h2>
                <button className="registro__form__button income__button" onClick={handleCreateClick}>Agregar Egreso</button>
                <div className="income">
                    <Expenses egresoProps={egresos} setEgresos={setEgresos}/>
                </div>
                {create ? <AgregarEgreso setCreate={setCreate} setEgresos={setEgresos}/> : null}
                {create ? <div className="usuario__overlay"></div> : null}
        </div>
    );
}