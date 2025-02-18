import * as z from 'zod'

export const colorSchema = z.object({
  colorName: z.string({ required_error: '* Color Name Required' }).min(1, '* Color Name Required'),
})
export type ColorFormValues = z.infer<typeof colorSchema>
