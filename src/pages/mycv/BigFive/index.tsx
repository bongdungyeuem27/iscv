import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}
const BigFive = (props: Props) => {
  const employeeId = useParams()?.id

  const [pdfUrl, setPdfUrl] = useState<string | undefined>()
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  useEffect(() => {
    if (!employeeId) return
  }, [])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {pdfUrl && (
        <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'}>
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      )}
    </div>
  )
}

export default BigFive
