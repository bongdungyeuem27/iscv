import { API_ENDPOINT_NODEJS } from '@constants/index'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useState } from 'react'

type Props = {}
const BigFive = (props: Props) => {
  const [pdfUrl, setPdfUrl] = useState(`${API_ENDPOINT_NODEJS}public/report.pdf`) // Replace '' with the URL of your PDF
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'}>
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  )
}

export default BigFive
