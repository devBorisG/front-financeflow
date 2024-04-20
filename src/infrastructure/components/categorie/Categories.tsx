import {CategoriesProps} from "../../types/props/CategoriesProps";

export const Categories = ({ user,categoriesProps }: CategoriesProps) => {
    return(
        categoriesProps.map((category) => {
            return(
                <div key={category.id}>
                    <div className="categories">
                        <h1>{category.nombre}</h1>
                        <p>{category.descripcion}</p>
                        <p>{user? user.nombre : null} {user? user.apellido : null}</p>
                    </div>
                </div>
            );
        }
    ));
}