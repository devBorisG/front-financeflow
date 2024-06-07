import {Incomes} from "./Incomes.tsx";
import {useEffect, useState} from "react";
import {ConsultarIngresosAPI} from "../../../http/api/ingreso/ConsultarIngresosAPI.ts";
import {IngresoDTO} from "../../../http/dto/IngresoDTO.ts";
import {UsuarioDTO} from "../../../http/dto/UsuarioDTO.ts";
import {AgregarIngreso} from "../../popup/income/AgregarIngreso.tsx";

export function Income(){
    const [ingresos, setIngresos] = useState<IngresoDTO[]>([]);
    const [create, setCreate] = useState(false);
    const [search, setSearch] = useState("");
    let ingresosFiltrados: IngresoDTO[] = [];

    const handleCreateClick = () => {
        setCreate(true);
    };

    let usuarioDTO: UsuarioDTO = new UsuarioDTO();
    const user = localStorage.getItem('user');
    if (user) {
        usuarioDTO = new UsuarioDTO(JSON.parse(user));
    }

    useEffect(() => {
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
    }, [user, usuarioDTO?.id]);

    if(search === ''){
        ingresosFiltrados = ingresos;
    }else{
        ingresosFiltrados = ingresos.filter((ingreso) => {
            return ingreso.nombre.toLowerCase().includes(search.toLowerCase());
        });
    }

    return (
        <div className="income__container">
                <h2 className="income__titulo">Ingresos</h2>
                <div className="categoria__acciones">
                    <button className="registro__form__button income__button" onClick={handleCreateClick}>Agregar Ingreso</button>
                    <input
                            className="categoria__buscador"
                            type="text"
                            placeholder="Buscar un ingreso..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                </div>
                <div className="income">
                    <Incomes ingresoProps={ingresosFiltrados} setIngresos={setIngresos}/>
                </div>
                {create ? <AgregarIngreso setCreate={setCreate} setIngresos={setIngresos}/> : null}
                {create ? <div className="usuario__overlay"></div> : null}
        </div>
    );
}