import {Header} from "../Header.tsx";
import {Categories} from "./Categories.tsx";
import {useContext, useState} from "react";
import {UserContext} from "../UserContext.tsx";

export function Category(){
    const {user} = useContext(UserContext);
    const [search, setSearch] = useState("");
    const categories = [
        {
            id: "1",
            nombre: "Comida",
            descripcion: "Gastos de comida",
            usuario: {
                id: "1",
                nombre: "Juan",
                apellido: "Perez",
                contrasena: "",
                correo: ""
            }
        },
        {
            id: "2",
            nombre: "Transporte",
            descripcion: "Gastos de transporte",
            usuario: {
                id: "1",
                nombre: "Juan",
                apellido: "Perez",
                contrasena: "",
                correo: ""
            }
        },
        {
            id: "3",
            nombre: "Salud",
            descripcion: "Gastos de salud",
            usuario: {
                id: "1",
                nombre: "Juan",
                apellido: "Perez",
                contrasena: "",
                correo: ""
            }
        },
        {
            id: "4",
            nombre: "Educación",
            descripcion: "Gastos de educación",
            usuario: {
                id: "1",
                nombre: "Juan",
                apellido: "Perez",
                contrasena: "",
                correo: ""
            }
        },
        {
            id: "5",
            nombre: "Entretenimiento",
            descripcion: "Gastos de entretenimiento",
            usuario: {
                id: "1",
                nombre: "Juan",
                apellido: "Perez",
                contrasena: "",
                correo: ""
            }
        }
        ]
    return(
      <div>
          <Header />
          <div className="category__container">
              <h2 className="categoria__titulo">Categorías</h2>
              <section className="categorymanagement">
                  <div className="categoria__acciones">
                      <button className="categoria__boton">Agregar</button>
                      <input
                          className="categoria__buscador"
                          type="text"
                          placeholder="Buscar una categoria..."
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                      />
                  </div>
              </section>
              <div className="category">
                  <Categories user={user} categoriesProps={categories}/>
              </div>
          </div>
      </div>
    );
}