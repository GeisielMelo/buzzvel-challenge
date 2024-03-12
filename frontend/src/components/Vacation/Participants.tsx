import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { PlusIcon, UpdateIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { IVacation } from '@/types/IVacation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTable } from '@/context/TableContext'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '../ui/button'
import { AxiosError } from 'axios'

/** Participants Widget
 *  @param {IVacation} data - The vacation data provided by the parent component.
 *  @returns {JSX.Element} - A custom widget that popover a list of participants and allow the vacation update based on provided data.
 */
const Participants: React.FC<{ data: IVacation }> = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const { updateVacation } = useTable()

  const formSchema = z.object({
    participant: z
      .string()
      .min(3, { message: 'At least 3 characters long.' })
      .refine((value) => !data.participants || !data.participants.includes(value), {
        message: 'Participant already added.',
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participant: '',
    },
  })

  /** Submit the form and update the vacation based on provided data.
   *  Create a copy of the original data and push the new participant to the participants array.
   *  @returns {Promise<void>} - A promise that resolves when the vacation is updated.
   */
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const participants = data.participants || []
      participants.push(values.participant)

      await updateVacation(data._id, { ...data, participants })
    } catch (error) {
      if (error instanceof AxiosError) console.error(error.response?.data.message)
      if (error instanceof Error) console.error(error.message)
      if (error instanceof z.ZodError) console.error(error.issues)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <PlusIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-64'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-2'>
            <FormField
              control={form.control}
              name='participant'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input className='col-span-3' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button type='submit' variant='outline' disabled={loading}>
              {loading ? <UpdateIcon className='animate-spin' /> : <PlusIcon />}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}

export default Participants
