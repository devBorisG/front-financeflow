import React, {createContext, useState, FunctionComponent, useMemo, useEffect} from 'react';
import {UsuarioDTO} from "../http/dto/UsuarioDTO.ts";

// Define the shape of the context
interface UserContextProps {
    user: UsuarioDTO | null;
    setUser: (user: UsuarioDTO | null) => void;
}

// Create the context with a default value
export const UserContext = createContext<UserContextProps>({
    user: new UsuarioDTO({id: "", nombre: "", apellido: "", correo: "", contrasena: ""}),
    setUser: () => {},
});

// Define the props for the UserProvider component
interface UserProviderProps {
    children: React.ReactNode;
}

// Create the context provider
export const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {

    const [user, setUser] = useState<UsuarioDTO | null>(null);

    // Load user from local storage when component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Save user to local storage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const value = useMemo(() => ({ user, setUser }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};