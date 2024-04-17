import {UsuarioDTO} from "../../http/dto/UsuarioDTO.ts";
import React from "react";

interface CambiarContrasenaProps{
    user: UsuarioDTO;
    setEditPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CambiarContrasena({user, setEditPassword}: Readonly<CambiarContrasenaProps>){
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    const handleAcceptClick = () => {
        setEditPassword(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(currentPassword !== user.contrasena){
            alert("Esta contrasena actual no coincide con tu contrasena");
            handleAcceptClick();
            return;
        }
        handleAcceptClick();
    }

    return (
        <div className="cambiar-contrasena">
            <h1 className="cambiar-contrasena__titulo">Cambio de contrasena</h1>
            <form className="cambiar-contrasena__formulario" onSubmit={handleSubmit}>
                <label className="cambiar-contrasena__label">
                    Ingrese su actual contrasena:<input
                    className="cambiar-contrasena__input"
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required={true}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu nueva contrasena");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="cambiar-contrasena__label">
                    Nueva contrasena:<input
                    className="cambiar-contrasena__input"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required={true}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu nueva contrasena");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <section className="usuario__buttons">
                    <button className="cambiar-contrasena__button" type="submit">Aceptar</button>
                    <button className="usuario__button button__eliminar" onClick={handleAcceptClick}>Cancelar</button>
                </section>
            </form>
        </div>
    );
}