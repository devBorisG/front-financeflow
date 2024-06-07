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
        selector: (row: IngresoDTO) => row.descripcion, // Adjust the selector according to your DTO file (EgresoDTO
        sortable: true,
    },
    {
        name: 'Monto',
        selector: (row: IngresoDTO) => row.monto, // Adjust the selector according to your DTO file (EgresoDTO
        sortable: true,
    },
    {
        name: 'Periodicidad',
        selector: (row: IngresoDTO) => row.periodicidad, // Adjust the selector according to your DTO file (EgresoDTO
        sortable: true,
    },
    {
        name: 'Categoria',
        selector: (row: IngresoDTO) => row.categoria.nombre, // Adjust the selector according to your DTO file (EgresoDTO
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