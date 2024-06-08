import { IngresoDTO } from '../../../http/dto/IngresoDTO';
import { AccionesIngreso } from './AccionesIngreso';

interface ColumnProps {
    handleIngresoUpdate: () => void;
}

export const ColumnsIngresoConfig = ({ handleIngresoUpdate }: ColumnProps) => [
    {
        name: 'Nombre',
        selector: (row: IngresoDTO) => row.nombre,
        sortable: true,
    },
    {
        name: 'Descripcion',
        selector: (row: IngresoDTO) => row.descripcion,
        sortable: true,
    },
    {
        name: 'Monto',
        selector: (row: IngresoDTO) => row.monto.toLocaleString('es-ES', { style: 'currency', currency: 'COP' }),
        sortable: true,
    },
    {
        name: 'Periodicidad (En días)',
        selector: (row: IngresoDTO) => row.periodicidad,
        sortable: true,
    },
    {
        name: 'Categoria',
        selector: (row: IngresoDTO) => row.categoria.nombre,
        sortable: true,
    },
    {
        name: 'Acciones',
        cell: (ingreso: IngresoDTO) => (
            <AccionesIngreso
                ingreso={ingreso}
                handleIngresoUpdate={handleIngresoUpdate}
            />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];