const { z } = require('zod');

const taskSchema = z.object({
  title: z
    .string({
      required_error: 'Titulo de la tarea es un dato requerido',
    })
    .min(3, 'Titulo de la tarea es muy corto'),
  description: z
    .string({
      required_error: 'Descripción de la tarea es un dato requerido',
    })
    .min(3, 'Descripción de la tarea es muy corto'),
  status: z.string().optional(),
  comment: z.string().optional(),
});

module.exports = taskSchema;
