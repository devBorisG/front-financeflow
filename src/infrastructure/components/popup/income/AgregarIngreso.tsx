import React from "react";

interface CrearIngresoComponentProps{
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AgregarIngreso = ({setCreate}: Readonly<CrearIngresoComponentProps>) => {
    return (
        <div>
            Agregar Ingreso
        </div>
    );
}