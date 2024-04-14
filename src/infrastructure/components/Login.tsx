import React, {useState} from "react";
import eyeOpen from "../assets/img/open-eye.svg";
import eyeClosed from "../assets/img/close-eye.svg";
import oink from "../assets/img/oink.svg";
import {UsuarioDTO} from "../http/dto/UsuarioDTO.ts";
import {IngresarUsuarioAPI} from "../http/api/usuario/IngresarUsuarioAPI.ts";

export function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            togglePasswordVisibility();
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const usuario = new UsuarioDTO({
            id: "",
            nombre: "",
            apellido: "",
            correo: correo,
            contrasena: contrasena,
        });
        const loginUsuarioAPI = new IngresarUsuarioAPI(usuario);
        const response = loginUsuarioAPI.ingresarUsuario();
        response.then((res) => {
            alert(res.data.messages[0].content);
        }).catch((err) => {
            if (err.response.data.messages){
                alert(err.response.data.messages[0].content);
            }else {
                console.log(err);
            }
        });
    }

    return (
        <div className="login">
            <section className="content">
                <div className="registro">
                    <h1>Inicia Sesión</h1>
                    <img src={oink} className="oink" alt="Imagen de cerdito"/>
                    <form className="registro__form" onSubmit={handleSubmit}>
                        <label className="registro__form__label">
                            Correo:<input
                            className="registro__form__input"
                            type="email"
                            name="correo"
                            placeholder="Ingresa tu correo"
                            required={true}
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                            onInvalid={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu correo");
                            }}
                            onInput={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("");
                            }}
                        />
                        </label>
                        <label className="registro__form__label">
                            Contraseña:
                            <div className="contrasena__container">
                                <input
                                    className="registro__form__input"
                                    type={showPassword ? "text" : "password"}
                                    name="contrasena"
                                    placeholder="Ingresa una contrasena"
                                    required={true}
                                    value={contrasena}
                                    onChange={e => setContrasena(e.target.value)}
                                    onInvalid={(e) => {
                                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu nueva contrasena");
                                    }}
                                    onInput={(e) => {
                                        (e.target as HTMLInputElement).setCustomValidity("");
                                    }}
                                />
                                <button
                                    style={{backgroundImage: `url(${showPassword ? eyeOpen : eyeClosed}`}}
                                    className="contrasena__container--eye"
                                    onClick={togglePasswordVisibility}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </label>
                        <button className="registro__form__button" type="submit">Ingresar</button>
                    </form>
                    <div className="registro__link">
                        <p>¿Aun no te has registrado?</p>
                        <p>Registrate <a href="/">aquí</a></p>
                    </div>
                </div>
            </section>
        </div>
    );
}