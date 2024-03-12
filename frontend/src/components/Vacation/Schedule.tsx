import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '../ui/calendar'
import { useState } from 'react'
import { CalendarIcon, UpdateIcon } from '@radix-ui/react-icons'
import { useTable } from '@/context/TableContext'
import { IVacation } from '@/types/IVacation'
import { AxiosError } from 'axios'
import handleConvertDate from '@/utils/handleConvertDate'

/** Schedule Widget
 *  @param {IVacation} data - The vacation data provided by the parent component.
 *  @returns {JSX.Element} - A custom widget that popover a calendar and allow the vacation update based on provided data.
 */
const Schedule: React.FC<{ data: IVacation }> = ({ data }) => {
  const { updateVacation } = useTable()
  const [loading, setLoading] = useState<boolean>(false)
  const [date, setDate] = useState<Date | undefined>(
    data && data.scheduledAt ? data.scheduledAt : undefined,
  )

  /** Update the vacation based on provided data.
   *   @param {Date} scheduledAt - The selected date on calendar.
   */
  const handleUpdateSchedule = async (scheduledAt: Date) => {
    if (scheduledAt === data.scheduledAt) return

    try {
      setLoading(true)
      await updateVacation(data._id, { ...data, scheduledAt })
    } catch (error) {
      if (error instanceof AxiosError) console.error(error.response?.data.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: Date | undefined) => {
    if (e) {
      setDate(e)
      handleUpdateSchedule(e)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          {date ? (
            <div className='flex gap-2 items-center'>
              {loading ? (
                <>
                  <UpdateIcon className='animate-spin' /> {handleConvertDate(date)}
                </>
              ) : (
                <>
                  <CalendarIcon /> {handleConvertDate(date)}
                </>
              )}
            </div>
          ) : (
            <CalendarIcon />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <div className='rounded-md border'>
          <Calendar
            mode='single'
            disabled={loading}
            selected={date}
            onSelect={(e) => handleSubmit(e)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Schedule
