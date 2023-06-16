import { IPFS_GATEWAY } from '@constants/index'
import { useBigFiveEmployeeLazyQuery, useBigFiveEmployeeQuery } from '@graphql/generated/schema'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}
const BigFive = (props: Props) => {
  const employeeId = Number(useParams()?.id)
  const { data } = useBigFiveEmployeeQuery({
    variables: { employeeId: Number.isInteger(employeeId) ? employeeId : -1 }
  })
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {data?.bigFiveEmployee?.cid && (
        <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'}>
          <Viewer
            fileUrl={`${IPFS_GATEWAY}${data.bigFiveEmployee.cid}`}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      )}
    </div>
  )
}

export default BigFive
