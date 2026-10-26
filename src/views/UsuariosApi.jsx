import { useState, useEffect } from "react";

function UsuarioApi(){
    const [usuario, setUsuario]= useState([]);
    const [cargando, setCargando]=useState(true);
    const [error, setError]= useState("");

    useEffect(()=>{
        const fetchUsuario =async() =>{
        try {
            setCargando (true);
            const respuesta = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );
            if (!respuesta.ok) {
                throw new error("no fue posible obtener ususarios")
            }
            const datos = await respuesta.json();

            setUsuario(datos);
        }
        catch(error){
            setError("No pudimos cargar los usuarios, intenta nuevamente");
        }
        finally{
            setCargando(false);
        }
        }
    
fetchUsuario();      

    },[]);
if (cargando){
    return <p>Cargando usuarios...</p>;
}
if (error){
    return <p>{error}</p>;
}

return(
    <section>
        <h2>Usuarios de prueba</h2>
        <p>Esta informacion proviene de una api externa</p>
        <div className="lista-usuarios">
            {usuario.map((usuario) => (
                <article className="lista-usuario">
                    <div key={usuario.id}/>
                    <h3>{usuario.name}</h3>
                    <p>{usuario.email}</p>
                </article>

            ))}

        </div>
    </section>
)
}
export default UsuarioApi;