import '../css/root.css';
import '../css/login/loginForm.css';

export function Login() {
    return (
        <div>
            <form className="loginForm">
                <label className="loginForm-label">
                    Nombre:<input className="loginForm-input" type="text" name="nombre" placeholder="Ingresa tu nombre"/>
                </label>
                <label className="loginForm-label">
                    Apellido:<input  className="loginForm-input" type="text" name="apellido" placeholder="Ingresa tu apellido"/>
                </label>
                <label className="loginForm-label">
                    Correo:<input  className="loginForm-input" type="email" name="usuario" placeholder="Ingresa tu correo"/>
                </label>
                <label className="loginForm-label">
                    Crea una contraseña:<input className="loginForm-input" type="password" name="contrasena" placeholder="Ingresa una contrasena"/>
                </label>
                <label className="loginForm-label">
                    Confirma tu contraseña:<input  className="loginForm-input" type="password" name="confirm-contrasena" placeholder="Ingresa la misma contrasena"/>
                </label>
                <button className="loginForm-button" type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}