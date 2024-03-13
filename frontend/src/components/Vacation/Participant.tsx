import { useTable } from '@/context/TableContext'
import { IVacation } from '@/types/IVacation'
import { AxiosError } from 'axios'
import { useState } from 'react'

interface IParticipant {
  element: IVacation
  member: string
}

/** Render a element present on the array participants.
 *  @returns {JSX.Element} A button with the name of the participant allowing to delete it on click.
 *  
 */
const Participant: React.FC<IParticipant> = ({ element, member }) => {
  const [loading, setLoading] = useState(false)
  const { updateVacation } = useTable()

  /** Removes the member from the array participants and updates the vacation element. */
  const handleRemoveParticipant = () => {
    try {
      setLoading(true)
      updateVacation(element._id, {
        ...element,
        participants: element.participants && element.participants.filter((p) => p !== member),
      })
    } catch (error) {
      if (error instanceof AxiosError) console.error(error.response?.data.message)
      if (error instanceof Error) console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className='capitalize hover:line-through hover:cursor-pointer'
      onClick={() => handleRemoveParticipant()}
      disabled={loading}
    >
      {member}
    </button>
  )
}

export default Participant
