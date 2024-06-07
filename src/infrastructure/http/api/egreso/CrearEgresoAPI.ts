import axios from 'axios';
import { EgresoAPIRoutes } from '../../routes/EgresoAPIRoutes';
import { EgresoDTO } from '../../dto/EgresoDTO';

export class CrearEgresoAPI {
    private crear = EgresoAPIRoutes.egreso.crear;
    private readonly egresoDTO: EgresoDTO;

    constructor(egresoDTO: EgresoDTO) {
        this.egresoDTO = egresoDTO;
    }

    public async crearEgreso() {
        return await axios.post(this.crear, this.egresoDTO);
    }
}