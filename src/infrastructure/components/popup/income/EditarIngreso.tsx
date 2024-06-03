import { IngresoDTO } from "../../../http/dto/IngresoDTO";
import React from "react";

export interface EditarIngresoComponentProps{
    ingreso: IngresoDTO;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditarIngreso = ({ ingreso, setEdit }: Readonly<EditarIngresoComponentProps>) => {
    return (
        <div>
            {ingreso.nombre}
            Editar Ingreso
        </div>
    );
}