import {Link} from "react-router-dom";

type UserInfoProps = {
    show: boolean;
}

export const UserInfo = ( { show }: UserInfoProps) =>{
    return (
        <div className={show ? 'popup active' : 'popup'}>
            <ul className="lista__usuario">
                <li className="item__usuario">
                    <Link to="/user">
                        Información de la cuenta
                    </Link>
                </li>
                <li className="item__usuario">
                    <Link to="/dashboard">
                        Cerrar Sesión
                    </Link>
                </li>
            </ul>
        </div>
    );
}