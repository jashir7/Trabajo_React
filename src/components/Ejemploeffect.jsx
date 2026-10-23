import {useEffect} from "react";
function Ejemploeffect(){
    useEffect(()=> {
        console.log('el componente funciona')

    }, []);

    return(
        <section>
            <h1>viva peru</h1>
        </section>
    )
}

export default Ejemploeffect;