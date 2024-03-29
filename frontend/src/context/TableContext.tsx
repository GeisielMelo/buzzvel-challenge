/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { AxiosError } from 'axios'
import { IVacation } from '@/types/IVacation'
import VacationService from '@/api/VacationService'

type TableContextProps = {
  data: IVacation[]
  loading: boolean
  setData: React.Dispatch<React.SetStateAction<IVacation[] | []>>
  addVacation: (values: IVacation) => Promise<void>
  deleteVacation: (id: string) => Promise<void>
  updateVacation: (id: string, values: IVacation) => Promise<void>
}

type TableProviderProps = {
  children: ReactNode
}

const TableContext = createContext<TableContextProps | undefined>(undefined)

/** Custom hook to access the TableContext.
 *  @var data - The data of the table.
 *  @var loading - The loading state of the table.
 *  @function setData - Set the data of the table.
 *  @function addVacation - Add a new vacation to the table.
 *  @function deleteVacation - Remove a vacation from the table.
 *  @function updateVacation - Update a vacation in the table.
 *  @example  const { data, addVacation } = useTable()
 */
export const useTable = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTable must be used inside an TableProvider.')
  }
  return context
}

/** TableProvider - Allows child components to utilize the useTable() hook. */
export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
  const [data, setData] = useState<IVacation[] | []>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await VacationService.find()
        if (response.status === 200) return setData(response.data)
        else setData([])
      } catch (error) {
        if (error instanceof AxiosError) console.log(error.response?.data.error)
        else console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (data.length === 0) fetchData()
  }, [])

  /** Add a new document to the database and include it in the context data. */
  const addVacation = async (values: IVacation) => {
    const response = await VacationService.create(values as IVacation)
    if (response.status === 201) setData([...data, response.data])
    else {
      throw new Error('Something gone wrong on create vacation.')
    }
  }

  /** Remove a document from the database and context data. */
  const deleteVacation = async (id: string) => {
    const response = await VacationService.findAndDelete(id)
    if (response.status === 200) {
      setData(data.filter((item) => item._id !== id))
    } else {
      throw new Error('Something gone wrong on delete vacation.')
    }
  }

  /** Update a document in the database and context data. */
  const updateVacation = async (id: string, values: IVacation) => {
    const response = await VacationService.findAndUpdate(id, values)
    if (response.status === 200) {
      setData(data.map((item) => (item._id === id ? response.data : item)))
    } else {
      throw new Error('Something gone wrong on update vacation.')
    }
  }

  const value = {
    data,
    loading,
    setData,
    addVacation,
    deleteVacation,
    updateVacation,
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}
