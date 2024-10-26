import './App.css'
import { useState } from 'react'
import { HStack, Text, Card, Flex, Input, Grid, GridItem, createIcon, Stack, Button } from "@chakra-ui/react"
import { Field } from "./components/ui/field"
import { Toaster, toaster } from "./components/ui/toaster"
import { Avatar } from "./components/ui/avatar"
import { LuUser } from 'react-icons/lu'
import { InputGroup } from "./components/ui/input-group"
import { FaRegIdCard } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { useForm } from "react-hook-form"
import { CardBasic } from './components/ui/cardbasic'
import axios from 'axios'

function App() {
    const[loading, setLoading] = useState(false)
    const[saldo, setSaldo] = useState(0)
    // const[menu, setMenu] = useState('menu')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const {
        register:register2,
        handleSubmit: handleSubmit2,
        formState: { errors:error2 },
        reset:reset2,
    } = useForm()

    const {
        register: register3,
        handleSubmit: handleSubmit3,
        formState: { errors:error3 },
        reset:reset3,
    } = useForm()

    const {
        register: register4,
        handleSubmit: handleSubmit4,
        formState: { errors:error4 },
        reset:reset4,
    } = useForm()

    const onChange = (event) => {
        event.target.value = event.target.value.toUpperCase();
    };

    // Peticiones
    const onRegistrarUsuario = async(data)=>{
        let tipo = 'success';
        let mensaje = "Usuario Registrado Exitosamente";
        try {
            await axios.post('http://localhost:3001/api/usuarios/', data);
            reset()
        } catch (error) {
            tipo = 'error'
            mensaje = error.response.data.message
        } finally {
            toaster.create({
                description: mensaje,
                type: tipo,
            })
        }
    } 

    const onRecargarUsuario = async(data)=>{
        let tipo = 'success';
        let mensaje = "Recarga Ralizada Exitosamente";
        try {
            await axios.post('http://localhost:3001/api/recargas/', {
                ...data,
                monto: parseFloat(data.monto),
                descripcion: 'recarga',
            });
        } catch (error) {
                tipo = 'error'
                mensaje = error.response.data.message
        } finally {
            toaster.create({
                description: mensaje,
                type: tipo,
            })
        }
    }

    const onConsultarSaldo = async(data)=>{

        let tipo = 'success';
        let mensaje = "Consulta Existosa";
        try {
            const res_saldo = await axios.get(`http://localhost:3001/api/saldos/${data.documento}/`);
            console.log(res_saldo);
            setSaldo(res_saldo.data.data.saldo)
        } catch (error) {
                tipo = 'error'
                mensaje = error.response.data.message
        } finally {
            toaster.create({
                description: mensaje,
                type: tipo,
            })
        }
    }

    const onPagarUsuario = async(data)=>{
        let tipo = 'success';
        let mensaje = "Pago Cargado Exitosamente";
        try {
            await axios.post('http://localhost:3001/api/pagar/', {
                ...data,
                monto: parseFloat(data.monto),
                descripcion: 'pagar',
            });
        } catch (error) {
                tipo = 'error'
                mensaje = error.response.data.message
        } finally {
            toaster.create({
                description: mensaje,
                type: tipo,
            })
        }
    }

    const onSubmit = handleSubmit(onRegistrarUsuario)
    const onSubmit2 = handleSubmit2(onRecargarUsuario)
    const onSubmit3 = handleSubmit3(onConsultarSaldo)
    const onSubmit4 = handleSubmit4(onPagarUsuario)

    return (
        <HStack>
            <Toaster />

            <Flex gap="4" direction="column">
                <Flex gap="4" justify="center">
                    <Text textStyle="4xl">Prueba Tecnica ePayco</Text>
                </Flex>
                <Flex gap="4" justify="center">

                    <Card.Root width="28%">
                        <Card.Body gap="2">
                            <Card.Title mt="2">1. Registrar Usuario</Card.Title>
                            <Card.Description>
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                            <form onSubmit={onSubmit}>
                                <Stack gap="4" align="flex-start" maxW="sm">
                                    <Field
                                    label="DOCUMENTO"
                                    invalid={!!errors.documento}
                                    errorText={errors.documento?.message}
                                    >
                                        <Input
                                            {...register("documento", {
                                                required: "Documento es obligatorio",
                                                maxLength:30,
                                            })}
                                        />
                                    </Field>
                                    <Field
                                    label="NOMBRES"
                                    invalid={!!errors.nombre}
                                    errorText={errors.nombre?.message}
                                    >
                                        <Input
                                            {...register("nombre", { 
                                                required: "Nombres es obligatorio",
                                                maxLength: 30
                                            })}
                                            onChange={onChange}
                                        />
                                    </Field>
                                    <Field
                                    label="EMAIL"
                                    invalid={!!errors.email}
                                    errorText={errors.email?.message}
                                    >
                                        <Input
                                            {...register("email", { 
                                                required: "Email es obligatorio",
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            })}
                                        />
                                    </Field>
                                    <Field
                                    label="CELULAR"
                                    invalid={!!errors.celular}
                                    errorText={errors.celular?.message}
                                    >
                                        <Input
                                            {...register("celular", {
                                                required: "Celular es obligatorio",
                                                minLength: 7,
                                            })}
                                        />
                                    </Field>
                                    <Button type="submit">Registrar</Button>
                                </Stack>
                            </form>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root width="28%">
                        <Card.Body gap="2">
                            <Card.Title mt="2">2. Recargar Usuario</Card.Title>
                            <Card.Description>
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                            <form onSubmit={onSubmit2}>
                                <Stack gap="4" align="flex-start" maxW="sm">
                                    <Field
                                    label="DOCUMENTO"
                                    invalid={!!error2.documento}
                                    errorText={error2.documento?.message}
                                    >
                                        <Input
                                            {...register2("documento", {
                                                required: "Documento es obligatorio",
                                                maxLength:30,
                                            })}
                                        />
                                    </Field>
                                    <Field
                                    label="MONTO"
                                    invalid={!!error2.monto}
                                    errorText={error2.monto?.message}
                                    >
                                        <Input
                                            {...register2("monto", { 
                                                required: "El monto es obligatorio",
                                                maxLength: 10,
                                                pattern: {
                                                    value: /^\d+(\.\d{1,2})?$/,
                                                    message: 'Ingrese un número decimal con hasta 2 decimales'
                                                }                                 
                                            })}
                                        />
                                    </Field>
                                    
                                    <Button type="submit">Recargar</Button>
                                </Stack>
                            </form>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root width="28%">
                        <Card.Body gap="2">
                            <Card.Title mt="2">2. Pagar Usuario</Card.Title>
                            <Card.Description>
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                            <form onSubmit={onSubmit4}>
                                <Stack gap="4" align="flex-start" maxW="sm">
                                    <Field
                                    label="DOCUMENTO"
                                    invalid={!!error4.documento}
                                    errorText={error4.documento?.message}
                                    >
                                        <Input
                                            {...register4("documento", {
                                                required: "Documento es obligatorio",
                                                maxLength:30,
                                            })}
                                        />
                                    </Field>
                                    <Field
                                    label="MONTO"
                                    invalid={!!error4.monto}
                                    errorText={error4.monto?.message}
                                    >
                                        <Input
                                            {...register4("monto", { 
                                                required: "El monto es obligatorio",
                                                maxLength: 10,
                                                pattern: {
                                                    value: /^\d+(\.\d{1,2})?$/,
                                                    message: 'Ingrese un número decimal con hasta 2 decimales'
                                                }                                 
                                            })}
                                        />
                                    </Field>
                                    
                                    <Button type="submit">Pagar</Button>
                                </Stack>
                            </form>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root width="28%">
                        <Card.Body gap="2">
                            <Card.Title mt="2">4. Consultar Saldo</Card.Title>
                            <Card.Description>
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                            <form onSubmit={onSubmit3}>
                                <Stack gap="4" align="flex-start" maxW="sm">
                                    <Field
                                    label="DOCUMENTO"
                                    invalid={!!error3.documento}
                                    errorText={error3.documento?.message}
                                    >
                                        <Input
                                            {...register3("documento", {
                                                required: "Documento es obligatorio",
                                                maxLength:30,
                                            })}
                                        />
                                    </Field>

                                    <Field>
                                        <h1>{saldo} $</h1>
                                    </Field>
                                    
                                    <Button type="submit">Consultar</Button>
                                </Stack>
                            </form>
                        </Card.Body>
                    </Card.Root>

                </Flex>
            </Flex>

            

        </HStack>
    )
}

export default App
