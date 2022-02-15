import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

const VerCliente = () => {

    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        const obtenerClienteApi = async () => {
            setCargando(!cargando)
            try {
                const url = `http://localhost:4000/clientes/${id}`
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

        cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
            <div>
                <>
                    <h1 className="font-black text-4xl text-black">Ver Cliente: {cliente.nombre}</h1>
                    <p>Informacion del cliente</p>
                    <p className="text-2xl text-gray-500 mt-10">
                        <span
                            className="text-gray-700 font-bold"
                        >
                            Cliente:{' '}
                        </span>
                        {cliente.nombre}
                    </p>
                    <p className="text-2xl mt-4 text-gray-500">
                        <span
                            className="text-gray-700 font-bold"
                        >
                            Email:{' '}
                        </span>
                        {cliente.email}
                    </p>
                    <p className="text-2xl mt-4 text-gray-500">
                        <span
                            className="text-gray-700 font-bold"
                        >
                            Telefono:{' '}
                        </span>
                        {cliente.telefono}
                    </p>
                    <p className="text-2xl mt-4 text-gray-500">
                        <span
                            className="text-gray-700 font-bold"
                        >
                            Empresa:{' '}
                        </span>
                        {cliente.empresa}
                    </p>
                    {cliente.notas && (
                        <p className="text-2xl mt-4 text-gray-500">
                            <span
                                className="text-gray-700 font-bold"
                            >
                                Notas:{' '}
                            </span>
                            {cliente.notas}
                        </p>
                    )}
                </>
            </div>
        )

    )
}

export default VerCliente