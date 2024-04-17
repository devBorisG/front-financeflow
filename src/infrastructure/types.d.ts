export interface Usuario {
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
}

export interface Categories{
    id: string,
    nombre: string,
    descripcion: string,
    usuario: Usuario
}

export interface BackendResponse {
    data: {
        messages: {
            level: string,
            content: string,
        }[];
        data: any[];
        token: string;
    }
}
