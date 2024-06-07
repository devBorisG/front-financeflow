import { useEffect, useState } from "react";
import { UsuarioDTO } from "../../http/dto/UsuarioDTO";
import { MetaDTO } from "../../http/dto/MetaDTO";
import { ConsultarMetaAPI } from "../../http/api/metas/ConsultarMetaAPI";
import { Header } from "../Header";
import { Goals } from "./Goals";
import { AgregarMeta } from "../popup/goal/AgregarMeta";

export function Goal(){
    const [metas, setMetas] = useState<MetaDTO[]>([]);
    const [search, setSearch] = useState("");
    const [create, setCreate] = useState(false);
    let metasFiltradas:MetaDTO[] = [];

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
            const consultarMetasAPI = new ConsultarMetaAPI(usuarioDTO?.id);
            const response = consultarMetasAPI.consultarMeta();
            response.then((res) => {
                const metaData = res.data.data.map((metaData: MetaDTO) => {
                    const meta = new MetaDTO();
                    meta.id = metaData.id;
                    meta.descripcion = metaData.descripcion;
                    meta.nombre = metaData.nombre;
                    meta.monto = metaData.monto;
                    meta.fechaInicio = metaData.fechaInicio;
                    meta.fechaFin = metaData.fechaFin;
                    return meta;
                });
                setMetas(metaData);
            }).catch((err) => {
                console.log(err);
                console.log(err.data);
            });
        }
    }, [user, usuarioDTO?.id]);

    if(search === ''){
        metasFiltradas = metas;
    }else{
        metasFiltradas = metas.filter((meta) => {
            return meta.nombre.toLowerCase().includes(search.toLowerCase());
        });
    }

    return(
        <div>
            <Header />
            <div className="category__container">
                <h2 className="categoria__titulo">Metas</h2>
                <section className="categorymanagement">
                    <div className="categoria__acciones">
                        <button className="categoria__boton" onClick={handleCreateClick}>Agregar Meta</button>
                        <input
                            className="categoria__buscador"
                            type="text"
                            placeholder="Buscar una meta..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </section>
                <div className="category">
                    <Goals metaProps={metasFiltradas} setMeta={setMetas}/>
                </div>
                {create ? <AgregarMeta setCreate={setCreate} setMetas={setMetas}/> : null}
                {create ? <div className="usuario__overlay"></div> : null}
            </div>
        </div>
    );
}