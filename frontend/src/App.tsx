import { UpdateIcon } from '@radix-ui/react-icons'
import Table from './components/Vacation'
import Add from './components/Vacation/Add'
import { useTable } from './context/TableContext'

const App: React.FC = () => {
  const { data, loading } = useTable()

  return (
    <section className='flex flex-col items-center'>
      <main className='flex flex-col max-w-5xl w-full gap-4 p-4'>
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-between w-full'>
          <h1 className='text-2xl font-bold'>Holiday Planning</h1>
          <Add/>
        </div>

        <div className='flex justify-center p-6 border rounded-md'>
          {loading ? <UpdateIcon className='animate-spin' /> : <Table data={data} />}
        </div>
      </main>
    </section>
  )
}

export default App
