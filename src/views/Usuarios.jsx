import { useEffect, useState } from "react";

function Usuarios() {
    const [Usuarios, setUsuarios] = useState([]);

    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((respuesta) => respuesta.json())
            .then((datos) => { setUsuarios(datos) })
    })
    return (
        <section>
            <h2>¡Usuarios!</h2>
            {Usuarios.map((Usuario) =>
            (<div key={Usuario.id}>

                <strong>Nombre: {Usuario.name} | Email: {Usuario.email}</strong>     
        
        
        
                </div>





    ))
}
        </section >

    )
}

export default Usuarios;