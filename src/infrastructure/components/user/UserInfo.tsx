import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

type UserInfoProps = {
    show: boolean;
}

export const UserInfo = ( { show }: UserInfoProps) =>{

    const [, , removeCookie] = useCookies(['token']);
    const logout = () => {
        removeCookie('token', { path: '/' });
    }
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
                    <Link to="/" onClick={logout}>
                        Cerrar Sesión
                    </Link>
                </li>
            </ul>
        </div>
    );
}