import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre es obligatorio')
        ,
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('Email no valido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .integer('Numero no valido')
            .positive('Numero no valido')
            .typeError('El numero no es valido')
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta
            if (cliente.id) {
                //Editar registro
                respuesta = await fetch(`http://localhost:4000/clientes/${cliente.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                //Agregar registro
                respuesta = await fetch('http://localhost:4000/clientes', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }

            await respuesta.json()
            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-xl shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                    {cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
                </h1>
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente.email ?? '',
                        telefono: cliente.telefono ?? '',
                        notas: cliente.notas ?? ''
                    }}
                    enableReinitialize={true}
                    validationSchema={nuevoClienteSchema}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)
                        resetForm()
                    }}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form className="mt-10">
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="nombre"
                                    >Nombre:</label>
                                    <Field
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Nombre del cliente"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>
                                            {errors.nombre}
                                        </Alerta>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="empresa"
                                    >Empresa:</label>
                                    <Field
                                        id="empresa"
                                        name="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Empresa del cliente"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>
                                            {errors.empresa}
                                        </Alerta>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="email"
                                    >Correo:</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Correo del cliente"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>
                                            {errors.email}
                                        </Alerta>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="telefono"
                                    >Telefono:</label>
                                    <Field
                                        id="telefono"
                                        name="telefono"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Telefono del cliente"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>
                                            {errors.telefono}
                                        </Alerta>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="notas"
                                    >Notas:</label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        name="notas"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-100 h-40"
                                        placeholder="Notas del cliente"
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
                                    className="mt-5 w-full bg-black uppercase text-white font-bold rounded-md py-5 cursor-pointer hover:opacity-80"
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario