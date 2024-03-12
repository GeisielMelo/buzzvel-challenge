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

const VacationTable: React.FC<{ data: IVacation[] }> = ({ data }) => {
  const handleConvertDate = (rawData: Date) => {
    return new Date(rawData).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
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
            <TableCell className='flex flex-wrap gap-2'>
              {element.participants?.map((member, _key) => (
                <p key={_key}>{member}</p>
              ))}
            </TableCell>
            <TableCell>
              {element.scheduledAt ? handleConvertDate(element.scheduledAt) : '---'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default VacationTable
