import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from '../components/Formulario'

const EditarCliente = () => {

    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        const obtenerClienteApi = async () => {
            setCargando(!cargando)
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }

            setCargando(false)

        }
        obtenerClienteApi()

    }, [])

    return (
        <>
            <h1 className="font-black text-4xl text-black">Editar cliente</h1>
            <p>Utiliza este formulario para editar un cliente</p>
            {cliente?.nombre ? (
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                />
            ):(
                <p>Cliente id no valido</p>
            )}

        </>
    )
}

export default EditarCliente