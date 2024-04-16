import {Header} from "../Header.tsx";
import {UserContext} from "../UserContext.tsx";
import {useContext, useState} from "react";
import {EditarUsuario} from "../popup/EditarUsuario.tsx";
import {CambiarContrasena} from "../popup/CambiarContrasena.tsx";

export function User(){
    const {user} = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [editPassword, setEditPassword] = useState(false);


    const handleEditClick = () => {
        setEdit(true);
    };
    const handleEditPasswordClick = () => {
        setEditPassword(true);
    };
    return (
        <div className="usuario">
            <Header/>
            <h1>Bienvenido {user ? user.nombre : ''}</h1>
            <div className="usuario__block">
                <section className="usuario__container">
                    <div className="usuario__info">
                        <h2>Información de la cuenta</h2>
                        <div className="usuario__data">
                            <h3>Nombre:</h3>
                            <p>{user ? user.nombre : ''}</p>
                        </div>
                        <div className="usuario__data">
                            <h3>Apellido:</h3>
                            <p>{user ? user.apellido : ''}</p>
                        </div>
                        <div className="usuario__data">
                            <h3>Correo:</h3>
                            <p>{user ? user.correo : ''}</p>
                        </div>
                    </div>
                </section>
                <section className="usuario__buttons">
                    <button className="usuario__button" onClick={handleEditClick}>Editar Información</button>
                    <button className="usuario__button" onClick={handleEditPasswordClick}>Cambiar Contraseña</button>
                    <button className="usuario__button button__eliminar">Eliminar Cuenta</button>
                </section>
            </div>
            {edit && user ? <EditarUsuario user={user} setEdit={setEdit}/> : null}
            {editPassword && user ? <CambiarContrasena user={user} setEditPassword={setEditPassword}/> : null}
            {edit||editPassword ? <div className="usuario__overlay"></div> : null}
        </div>
    );
}