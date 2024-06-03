import {Income} from "./income/Income.tsx";
import {Expense} from "./Expense.tsx";
import {useState} from "react";

export function Wallet(){
    const [activeButton, setActiveButton] = useState("Ingresos");

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