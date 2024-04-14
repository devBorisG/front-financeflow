export interface Usuario {
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    contrasena: string,
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