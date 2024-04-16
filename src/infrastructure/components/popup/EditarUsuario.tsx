import {UsuarioDTO} from "../../http/dto/UsuarioDTO.ts";
import React, {useState} from "react";
import {ActualizarUsuarioAPI} from "../../http/api/usuario/ActualizarUsuarioAPI.ts";

interface EditarUsarioComponentProps{
    user: UsuarioDTO;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditarUsuario = ({user, setEdit}: Readonly<EditarUsarioComponentProps>) => {
    const [nombre, setNombre] = useState(user.nombre);
    const [apellido, setApellido] = useState(user.apellido);
    const [correo, setCorreo] = useState(user.correo);

    const handleAcceptClick = () => {
        setEdit(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const actualizarUsuarioAPI = new ActualizarUsuarioAPI(new UsuarioDTO({
            id: user.id,
            nombre: nombre,
            apellido: apellido,
            correo: user.correo,
            contrasena: user.contrasena,
        }));
        const response = actualizarUsuarioAPI.actualizarUsuario();
        response.then((res) => {
            console.log(res.data.messages[0].level);
        }).catch((err) => {
            if (err.response.data.messages){
                console.log(err.response.data.messages[0].level);
                console.log(err.response.data.messages[0].content);
            }else {
                console.log(err);
            }
        });
        handleAcceptClick();
    };

    return (
        <div className="editar-usuario">
            <h1 className="editar-usuario__titulo">Datos de la cuenta</h1>
            <form className="editar-usuario__formulario" onSubmit={handleSubmit}>
                <label className="editar-usuario__label">
                    Nombre:<input
                    className="editar-usuario__input"
                    type="text"
                    value={nombre}
                    name="nombre"
                    required={true}
                    onChange={e => setNombre(e.target.value)}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu nombre");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}/>
                </label>
                <label className="editar-usuario__label">
                    Apellido:<input
                    className="editar-usuario__input"
                    type="text"
                    value={apellido}
                    name="nombre"
                    required={true}
                    onChange={e => setApellido(e.target.value)}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu apellido");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}
                />
                </label>
                <label className="editar-usuario__label">
                    Correo:<input
                    className="editar-usuario__input"
                    type="email"
                    value={correo}
                    name="nombre"
                    required={true}
                    onChange={e => setCorreo(e.target.value)}
                    onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa tu correo");
                    }}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity("");
                    }}
                />
                </label>
                <button type="submit" className="editar-usuario__button">Aceptar</button>
            </form>
        </div>
    );
}