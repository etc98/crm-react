import { useEffect, useState } from "react"
import Cliente from "../components/Cliente"

const Inicio = () => {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const url = import.meta.env.VITE_API_URL
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setClientes(resultado)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerClientes()

    }, [])

    const handleEliminar = async id => {
        const confirmar = confirm('Deseas eliminar este cliente')
        if(confirmar){
            try{

                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url, {
                    method: 'DELETE',
                })

                await respuesta.json()
                
                const arrayClientes = clientes.filter(cliente => cliente.id !== id)
                setClientes(arrayClientes)

            }catch(error){

            }
        }
    }

    return (
        <div>
            <h1 className="font-black text-4xl text-black">Clientes</h1>
            <p>Administra tus clientes</p>
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Empresa</th>
                        <th className="p-3">Contacto</th>
                        <th className="p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map(cliente => (
                            <Cliente
                                key={cliente.id}
                                cliente={cliente}
                                handleEliminar={handleEliminar}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Inicio