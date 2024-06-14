const { z } = require('zod');

const userSchema = z.object({
  name: z.string({
    required_error: 'Es requerido definir un nombre',
  }),
  username: z.string({
    required_error: 'Nombre de usuario es un dato requerido',
  }),
  password: z
    .string({
      required_error: 'Contraseña de usuario es un dato requerido',
    })
    .min(8, 'Contraseña de usuario debe tener minimo 8 caracteres')
    .refine((val) => /[A-Z]/.test(val), 'Contraseña de usuario debe contener mayusculas')
    .refine((val) => /[a-z]/.test(val), 'Contraseña de usuario debe contener minusculas'),
  typeOfUser: z.string({
    required_error: 'Tipo de usuario es un dato requerido',
  }),
});

module.exports = userSchema;
