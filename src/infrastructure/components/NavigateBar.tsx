import {Link} from "react-router-dom";
import { FaChartArea, FaDollarSign, FaWallet } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdCategory } from "react-icons/md";

type NavigateBarProps = {
    show: boolean;
    setShow: (show: boolean) => void;
}

export const NavigateBar = ({ show, setShow }: NavigateBarProps)=>{
    return (
        <>
            <button
                className={show ? 'overlay active' : 'overlay'}
                onClick={() => setShow(false)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        setShow(false);
                        event.preventDefault();
                    }
                }}
            />
            <div className={show ? 'siden active' : 'siden'}>
                <h2>Menú</h2>
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <FaWallet/>
                            Mi Cartera
                        </Link>
                    </li>
                    <li>
                        <Link to="/goals">
                            <GoGoal/>
                            Mis Metas
                        </Link>
                    </li>
                    <li>
                        <Link to="/budgets">
                            <FaDollarSign/>
                            Mis Presupuestos
                        </Link>
                    </li>
                    <li>
                        <Link to="/categorie">
                            <MdCategory/>
                            Mis categorias
                        </Link>
                    </li>
                    <li>
                        <Link to="/statistics">
                            <FaChartArea/>
                            Estadísticas
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}