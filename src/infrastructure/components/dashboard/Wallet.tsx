import {Income} from "./Income.tsx";
import {Expense} from "./Expense.tsx";
import {useState} from "react";

export function Wallet(){
    const [activeButton, setActiveButton] = useState("Ingresos");
    const ingresos = [
        {
            id: "1",
            cantidad: 100,
            descripcion: "Ingreso de dinero",
            fecha: "2021-09-20",
            categoria: {
                id: "1",
                nombre: "Salario",
                descripcion: "Ingreso de salario",
                usuario: {
                    id: "1",
                    nombre: "Juan",
                    apellido: "Perez",
                    contrasena: "",
                    correo: ""
                }
            }
        },
        {
            id: "2",
            cantidad: 200,
            descripcion: "Ingreso de dinero",
            fecha: "2021-09-20",
            categoria: {
                id: "2",
                nombre: "Venta",
                descripcion: "Ingreso de venta",
                usuario: {
                    id: "1",
                    nombre: "Juan",
                    apellido: "Perez",
                    contrasena: "",
                    correo: ""
                }
            }
        }
    ]

    return (
        <div className="wallet">
            <section className="wallet__section">
                <div className="wallet__buttons">
                    <button className="registro__form__button" onClick={() => setActiveButton("Ingresos")}>Ingresos</button>
                    <button className="registro__form__button" onClick={() => setActiveButton("Egresos")}>Egresos</button>
                </div>
                <div className="wallet__division">
                    {activeButton === "Ingresos" && <Income/>}
                    {activeButton === "Egresos" && <Expense/>}
                </div>
            </section>
        </div>
    );
}