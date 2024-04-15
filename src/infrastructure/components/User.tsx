import {Header} from "./Header.tsx";

export function User(){
    return (
        <div className="usuario">
            <Header/>
            <div className="usuario__container">
                <h1>Bienvenido Jhon Doe</h1>
                <form className="usuario__form">
                    <label className="usuario__form__label">
                        Nombre:<input
                            className="usuario__form__input"
                            type="text"
                            name="nombre"
                            placeholder="Ingresa tu nombre"
                            required={true}
                        />
                    </label>
                    <label className="usuario__form__label">
                        Apellido:<input
                            className="usuario__form__input"
                            type="text"
                            name="apellido"
                            placeholder="Ingresa tu apellido"
                            required={true}
                        />
                    </label>
                    <label className="usuario__form__label">
                        Correo:<input
                            className="usuario__form__input"
                            type="email"
                            name="correo"
                            placeholder="Ingresa tu correo"
                            required={true}
                        />
                    </label>
                    <label className="usuario__form__label">
                        Contraseña:<input
                            className="usuario__form__input"
                            type="password"
                            name="contrasena"
                            placeholder="Ingresa tu contraseña"
                            required={true}
                        />
                    </label>
                    <button className="usuario__form__button" type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    );
}