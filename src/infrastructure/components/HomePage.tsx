import React, { useState } from 'react';
import eyeClosed from '../assets/img/close-eye.svg';
import eyeOpen from '../assets/img/open-eye.svg';
import { UsuarioDTO } from "../http/dto/UsuarioDTO.ts";
import { RegistrarUsuarioValidator } from "../../service/validator/RegistrarUsuarioValidator.ts";
import {CrearUsuarioAPI} from "../http/api/usuario/CrearUsuarioAPI.ts";
import financeImage from '../assets/img/persona-homepage.svg';
import logoImage from '../assets/finance.svg';

export function HomePage() {
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmContrasena, setConfirmContrasena] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            togglePasswordVisibility();
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const usuario = new UsuarioDTO({
            id: "",
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena,
        });
        const error = RegistrarUsuarioValidator(usuario, confirmContrasena);
        if (error !== "") {
            alert(error);
        }else {
            const crearUsuarioAPI = new CrearUsuarioAPI(usuario);
            const response  = crearUsuarioAPI.crearUsuario();
            response.then((res) => {
                alert(res.data.messages[0].content);
                setNombre("");
                setApellido("");
                setCorreo("");
                setContrasena("");
                setConfirmContrasena("");
            }).catch((err) => {
                if (err.response.data.messages){
                    alert(err.response.data.messages[0].content);
                }else {
                    console.log(err);
                }
            });
        }
    };

    return (
        <div className="homepage">
            <header className="homepage_nav">
                <div className="izquierda">
                    <a href="/">
                        <img src={logoImage} alt="Logo de finanzas" className="logoFinazas"/>
                    </a>
                    <h1>Finance Flow</h1>
                </div>
                <div className="derecha">
                    <a href="/login">Iniciar sesión</a>
                </div>
            </header>
            <section className="content">
                <div className="registro">
                    <h1>¡Registrate!</h1>
                    <form className="registro__form" onSubmit={handleSubmit}>
                        <label className="registro__form__label">
                            Nombre:<input
                            className="registro__form__input"
                            type="text"
                            name="nombre"
                            placeholder="Ingresa tu nombre"
                            required={true}
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            onInvalid={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu nombre");
                            }}
                            onInput={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("");
                            }}
                        />
                        </label>
                        <label className="registro__form__label">
                            Apellido:<input
                            className="registro__form__input"
                            type="text"
                            name="apellido"
                            placeholder="Ingresa tu apellido"
                            required={true}
                            value={apellido}
                            onChange={e => setApellido(e.target.value)}
                            onInvalid={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu apellido");
                            }}
                            onInput={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("");
                            }}
                        />
                        </label>
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
                            Crea una contraseña:
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
                        <label className="registro__form__label">
                            Confirma tu contraseña:<input
                            className="registro__form__input"
                            type="password"
                            name="confirm-contrasena"
                            placeholder="Ingresa la misma contrasena"
                            required={true}
                            value={confirmContrasena}
                            onChange={e => setConfirmContrasena(e.target.value)}
                            onInvalid={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu contrasena nuevamente");
                            }}
                            onInput={(e) => {
                                (e.target as HTMLInputElement).setCustomValidity("");
                            }}
                        />
                        </label>
                        <button className="registro__form__button" type="submit">Registrarme</button>
                    </form>
                    <div className="registro__link">
                        <p>¿Ya tienes una cuenta?</p>
                        <p>Ingresa <a href="/login">aquí</a></p>
                    </div>
                </div>
                <div className="container">
                    <h1>Finance Flow</h1>
                    <p>Todo tu dinero bajo control</p>
                    <img className="financeImage" src={financeImage} alt="Imagen de finanzas"/>
                </div>
            </section>
        </div>
    )
}