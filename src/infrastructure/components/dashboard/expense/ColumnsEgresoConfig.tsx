import { EgresoDTO } from '../../../http/dto/EgresoDTO'; // Adjust the import according to your types file
import { AccionesEgreso } from './AccionesEgreso';// Adjust the import according to your components file

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
        selector: (row: EgresoDTO) => row.descripcion, // Adjust the selector according to your DTO file (EgresoDTO
        sortable: true,
    },
    {
        name: 'Monto',
        selector: (row: EgresoDTO) => row.monto, // Adjust the selector according to your DTO file (EgresoDTO
        sortable: true,
    },
    {
        name: 'Periodicidad',
        selector: (row: EgresoDTO) => row.periodicidad, // Adjust the selector according to your DTO file (EgresoDTO
        sortable: true,
    },
    {
        name: 'Categoria',
        selector: (row: EgresoDTO) => row.categoria.nombre, // Adjust the selector according to your DTO file (EgresoDTO
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