import {z} from 'zod';

export const 
createPropertySchema = z.object({

            name: z.string(),
            description: z.string().min(5), 
            area: z.number().positive()

}).required();  // .required() meaning compulsary needed to fill in,  或者用.optional()

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;