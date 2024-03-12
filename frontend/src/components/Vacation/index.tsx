import { IVacation } from '@/types/IVacation'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TrashIcon } from '@radix-ui/react-icons'
import { useTable } from '@/context/TableContext'
import { useState } from 'react'
import Schedule from './Schedule'
import Participants from './Participants'

const VacationTable: React.FC<{ data: IVacation[] }> = ({ data }) => {
  const { deleteVacation } = useTable()
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      await deleteVacation(id)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Table>
      <TableCaption>A list of your scheduled plannings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Participants</TableHead>
          <TableHead>Holyday</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((element, key) => (
          <TableRow key={key}>
            <TableCell>{element.title}</TableCell>
            <TableCell>{element.description}</TableCell>
            <TableCell>{element.location}</TableCell>
            <TableCell className='flex flex-wrap gap-2 capitalize'>
              <Participants data={element} />
              {element.participants?.map((member, _key) => (
                <p key={_key}>{member}</p>
              ))}
            </TableCell>
            <TableCell>
              <Schedule data={element} />
            </TableCell>
            <TableCell>
              <button
                onClick={() => handleDelete(element._id)}
                className='text-red-400 disabled:text-slate-200 disabled:cursor-progress'
                disabled={loading}
              >
                <TrashIcon />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default VacationTable
