import React, { useState } from 'react'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { Button } from '../ui/button'
import { DownloadIcon } from '@radix-ui/react-icons'
import { IVacation } from '@/types/IVacation'
import { AxiosError } from 'axios'
import VacationService from '@/api/VacationService'
import handleConvertDate from '@/utils/handleConvertDate'
import pdfMake from 'pdfmake/build/pdfmake'
import handleConvertParticipants from '@/utils/handleConvertParticipants'

type PdfMakeType = typeof pdfMake

/** Register the Roboto font for PDF generation.
 *   @type {PdfMakeType} pdfMake - The PDFMake library.
 */
const registerRobotoFonts = (pdfMake: PdfMakeType): void => {
  pdfMake.fonts = {
    Roboto: {
      normal:
        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    },
  }
}

registerRobotoFonts(pdfMake)

/** Initiate a PDF download based on the current data present in the database. */
const Download: React.FC = () => {
  const [loading, setLoading] = useState(false)

  /** Provide a schema for PDF generation.
   *   @param {IVacation[]} data - The vacation data provided by the parent component.
   *   @returns {TDocumentDefinitions} - A schema for PDF generation.
   */
  const createTableSchema = (data: IVacation[]): TDocumentDefinitions => {
    const bodyData = data.map((element) => [
      { text: element.title, fontSize: 10, alignment: 'left' },
      { text: element.description, fontSize: 10, alignment: 'left' },
      { text: element.location, fontSize: 10, alignment: 'left' },
      {
        text: (element.participants && handleConvertParticipants(element.participants)) || '',
        fontSize: 10,
        alignment: 'left',
      },
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

  /** Fetch data from the database.
   *   @returns {IVacation[]} - The vacation data fetched from the database.
   *   @throws {Error} - If an error occurs while fetching data.
   */
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

  /**  Generate a PDF based on the data present in the database. */
  const handleCreatePDF = async () => {
    const data = await fetchData()
    if (!data) return console.error('Error fetching data')
    const docDefinition = createTableSchema(data)
    const pdfGenerator = pdfMake.createPdf(docDefinition)
    return pdfGenerator.download()
  }

  return (
    <Button
      data-cy='download-pdf'
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
