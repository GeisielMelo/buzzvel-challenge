import { PlusCircledIcon, UpdateIcon } from '@radix-ui/react-icons'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTable } from '@/context/TableContext'
import { IVacation } from '@/types/IVacation'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const VacationAdd: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { addVacation } = useTable()

  const formSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
    description: z.string().min(3, { message: 'Description must be at least 3 characters long.' }),
    location: z.string().min(3, { message: 'Location must be at least 3 characters long.' }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await addVacation(values as IVacation)
      form.reset()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          <span>New</span>
          <PlusCircledIcon className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New vacancy</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-right'>Title</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-right'>Location</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-right'>Description</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type='reset'
                  disabled={loading}
                  variant='outline'
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' variant='default' disabled={loading}>
                {loading ? <UpdateIcon className='animate-spin' /> : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default VacationAdd
