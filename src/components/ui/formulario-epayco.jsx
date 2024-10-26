export const formEpayco = ({titulo, descripcion, errorValidator, nombre, id}) => (
    <Card.Root width="28%">
        <Card.Body gap="2">
        <Card.Title mt="2">{titulo}</Card.Title>
        <Card.Description>
           {descripcion}
        </Card.Description>
        <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" maxW="sm">
                <Field
                label="DOCUMENTO"
                invalid={!!errorValidator.documento}
                errorText={errorValidator.documento?.message}
                >
                    <Input
                        {...register("documento", {
                            required: "Documento es obligatorio",
                            maxLength:30,
                        })}
                    />
                </Field>
                <Field
                label={nombre}
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
)