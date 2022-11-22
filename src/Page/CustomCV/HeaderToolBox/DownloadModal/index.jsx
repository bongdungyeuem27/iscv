import React, { memo, useRef, useEffect, useContext } from 'react'
import Modal from '@component/Modal'
import styles from './styles.module.scss'
import html2canvas from 'html2canvas'
import { useReactToPrint } from 'react-to-print'
import { CustomCVContext } from '../../CustomCVContext'
import useToJson from '../../hooks/useToJson'

function Index(props) {
  const [open, setOpen] = props.state
  const { autoCreatement, list } = useContext(CustomCVContext)
  const handlePDF = useReactToPrint({
    content: () => document.getElementById('draw_child'),
    pageStyle: `
    @media print {
      html, body {
        height: initial !important;
        overflow: initial !important;
        -webkit-print-color-adjust: exact;
      }
    }
    @page {
      size: letter;
      margin: 0px;
    } `,
  })
  const handlePNG = () => {
    html2canvas(document.getElementById('draw_child')).then(function (canvas) {
      var link = document.createElement('a')
      document.body.appendChild(link)
      link.download = 'iscv.png'
      link.href = canvas.toDataURL()
      link.target = '_blank'
      link.click()
    })
  }
  const handleJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(useToJson(autoCreatement, list))
    )}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = 'iscv.json'
    link.click()
  }
  return (
    <Modal state={[open, setOpen]} title={'download'}>
      <div className={styles.container}>
        <div onClick={handlePDF} className={styles.item}>
          <i className="fa-light fa-file-pdf"></i>
          <a>Save to PDF</a>
        </div>

        <div onClick={handlePNG} className={styles.item}>
          <i className="fa-light fa-file-pdf"></i>
          <a>Save to PNG</a>
        </div>
        <div onClick={handleJSON} className={styles.item}>
          <i className="fa-light fa-file-pdf"></i>
          <a>Save to JSON</a>
        </div>
      </div>
    </Modal>
  )
}

export default memo(Index)
