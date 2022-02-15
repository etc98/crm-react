import { useNavigate } from "react-router-dom"

const Cliente = ({ cliente, handleEliminar }) => {

    const navigate = useNavigate()
    const { nombre, empresa, email, telefono, notas, id } = cliente

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-3">{nombre}</td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
                <p className="text-gray-800 font-bold">Email: <span>{email}</span></p>
                <p className="text-gray-800 font-bold">Telefono: <span>{telefono}</span></p>
            </td>
            <td>
                <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-md block w-full text-white font-bold mt-3"
                    onClick={() => navigate(`/clientes/${id}`)}
                >
                    Ver
                </button>
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md block w-full text-white font-bold mt-3"
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-md block w-full text-white font-bold mt-3 mb-3"
                    onClick={() => handleEliminar(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Cliente