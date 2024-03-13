import { IVacation } from '@/types/IVacation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TrashIcon } from '@radix-ui/react-icons'
import { useTable } from '@/context/TableContext'
import { useState } from 'react'
import Schedule from './Schedule'
import AddParticipant from './AddParticipant'
import Participant from './Participant'

/** Table component
 *
 * This component is responsible for receiving the 'data' from the TableContext and distributing it among its child components.
 * @param {IVacation[]} data - The vacation data provided by the parent component.
 * @returns {JSX.Element} - UI that displays information and allows data updating and removal.
 */
const VacationTable: React.FC<{ data: IVacation[] }> = ({ data }) => {
  const { deleteVacation } = useTable()
  const [loading, setLoading] = useState(false)

  /** Call deleteVacation function from the TableContext and handle the response.
   *   @param {string} id - The id of the vacation to be deleted.
   *   @throws {Error} - If an error occurs during the deletion process.
   *   @function setLoading() Control state of loading while the async function is running.
   */
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
      <TableHeader>
        <TableRow>
          <TableHead className='w-24'>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className='min-w-32'>Participants</TableHead>
          <TableHead className='min-w-44'>Holyday</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((element, key) => (
          <TableRow key={key}>
            <TableCell>{element.title}</TableCell>
            <TableCell>{element.description}</TableCell>
            <TableCell>{element.location}</TableCell>
            <TableCell className='flex flex-wrap gap-2 capitalize max-w-36 w-full'>
              {element.participants?.map((member, _key) => (
                <Participant key={_key} member={member} element={element} />
              ))}
              <AddParticipant data={element} dataCy={`add-participant-${key}`} />
            </TableCell>
            <TableCell>
              <Schedule data={element} dataCy={`open-calendar-${key}`}/>
            </TableCell>
            <TableCell>
              <button
                onClick={() => handleDelete(element._id)}
                className='text-red-400 disabled:text-slate-200 disabled:cursor-progress'
                disabled={loading}
                data-cy={`delete-item-${key}`}
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
