import { RxHamburgerMenu } from "react-icons/rx";
import {useState} from "react";
import {NavigateBar} from "./NavigateBar.tsx";
import logoImage from '../assets/finance.svg';
import { FaUser } from "react-icons/fa";
import {Link} from "react-router-dom";
import {UserInfo} from "./user/UserInfo.tsx";

export function Header() {
    const [showNav, setShowNav] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false)
    return (
        <div className="header">
            <header className="header__container">
                <div className="header__izquierda">
                    <RxHamburgerMenu className="header__menu" onClick={() => setShowNav(!showNav)}/>
                    <Link to="/dashboard">
                        <img src={logoImage} className="header__logo" alt="Logo de la aplicación"/>
                    </Link>
                    <h1>Finance Flow</h1>
                </div>
                <div className="header__derecha">
                    <FaUser className="header__menu__derecha" onClick={() => setShowUserInfo(!showUserInfo)}/>
                </div>
            </header>
            <NavigateBar show={showNav} setShow={setShowNav}/>
            <UserInfo show={showUserInfo}/>
        </div>
    );
}