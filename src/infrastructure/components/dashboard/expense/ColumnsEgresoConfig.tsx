import { EgresoDTO } from '../../../http/dto/EgresoDTO';
import { AccionesEgreso } from './AccionesEgreso';

interface ColumnProps {
    handleEgresoUpdate: () => void;
}

export const ColumnsEgresoConfig = ({ handleEgresoUpdate }: ColumnProps) => [
    {
        name: 'Nombre',
        selector: (row: EgresoDTO) => row.nombre,
        sortable: true,
    },
    {
        name: 'Descripcion',
        selector: (row: EgresoDTO) => row.descripcion,
        sortable: true,
    },
    {
        name: 'Monto',
        selector: (row: EgresoDTO) => row.monto.toLocaleString('es-ES', { style: 'currency', currency: 'COP' }),
        sortable: true,
    },
    {
        name: 'Periodicidad',
        selector: (row: EgresoDTO) => row.periodicidad,
        sortable: true,
    },
    {
        name: 'Categoria',
        selector: (row: EgresoDTO) => row.categoria.nombre,
        sortable: true,
    },
    {
        name: 'Acciones',
        cell: (egreso: EgresoDTO) => (
            <AccionesEgreso
                egreso={egreso}
                handleEgresoUpdate={handleEgresoUpdate}
            />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];