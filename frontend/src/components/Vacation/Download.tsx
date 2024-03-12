import React, { useState } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Button } from '../ui/button'
import { DownloadIcon } from '@radix-ui/react-icons'
import VacationService from '@/api/VacationService'
import { IVacation } from '@/types/IVacation'
import { AxiosError } from 'axios'
import handleConvertDate from '@/utils/handleConvertDate'
import { TDocumentDefinitions } from 'pdfmake/interfaces'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const Download: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const createTableSchema = (data: IVacation[]): TDocumentDefinitions => {
    const bodyData = data.map((element) => [
      { text: element.title, fontSize: 10, alignment: 'left' },
      { text: element.description, fontSize: 10, alignment: 'left' },
      { text: element.location, fontSize: 10, alignment: 'left' },
      { text: 'Ana, Clara, Marcos, Geisiel' || '', fontSize: 10, alignment: 'left' },
      {
        text: (element.scheduledAt && handleConvertDate(element.scheduledAt)) || '--/--/----',
        fontSize: 10,
        alignment: 'left',
      },
    ])

    return {
      content: [
        {
          text: 'Holiday Planning',
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },

        {
          margin: [0, 15, 0, 0],
          table: {
            widths: ['10%', '*', '10%', '20%', '18%'],
            headerRows: 1,
            body: [['Title', 'Description', 'Location', 'Participants', 'Scheduled'], ...bodyData],
          },
        },
      ],

      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center',
        },
      },

      footer: {
        columns: [{ text: 'A list of your scheduled plannings.', alignment: 'center' }],
      },
    }
  }

  const fetchData = async (): Promise<IVacation[] | undefined> => {
    try {
      setLoading(true)
      const response = await VacationService.find()
      if (response.status === 200) return response.data
      else return []
    } catch (error) {
      if (error instanceof AxiosError) console.error(error.response?.data.message)
      if (error instanceof Error) console.error(error.message)
      return undefined
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePDF = async () => {
    const data = await fetchData()
    if (!data) return console.error('Error fetching data')
    const docDefinition = createTableSchema(data)
    const pdfGenerator = pdfMake.createPdf(docDefinition)
    pdfGenerator.download()
  }

  return (
    <Button
      variant='outline'
      className='flex items-center gap-2 ml-auto'
      disabled={loading}
      onClick={handleCreatePDF}
    >
      <DownloadIcon className='h-4 w-4' />
    </Button>
  )
}

export default Download
