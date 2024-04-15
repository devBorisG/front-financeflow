import {Link} from "react-router-dom";

type UserInfoProps = {
    show: boolean;
}

export const UserInfo = ( { show }: UserInfoProps) =>{
    return (
        <div
            className={show ? 'popup active' : 'popup'}
        >
            <ul className="lista__usuario">
                <li className="item__usuario">
                    <Link to="/user">
                        Información de la cuenta
                    </Link>
                    <li className="item__usuario">
                </li>
                    <Link to="/">
                        Cerrar Sesión
                    </Link>
                </li>
            </ul>
        </div>
    );
}