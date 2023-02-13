import { toPng } from 'html-to-image'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import styles from './styles.module.scss'

type Props = {
  owner: boolean
}
function Index(props: Props) {
  const { owner } = props
  const params = useParams()
  const { t } = useTranslation('page', { keyPrefix: 'mycv.index' })
  const handlePDF = useReactToPrint({
    content: () => document.getElementById('mycv'),
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
    } 
`,
  })
  // const handlePNG = () => {
  //   let element = document.getElementById('mycv')
  //   if (!element) return
  //   element.style.height = 'initial !important'
  //   element.style.overflow = 'initial !important'
  //   toPng(element, { cacheBust: true })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a')
  //       link.download = `test.png`
  //       link.href = dataUrl
  //       link.click()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {owner && (
          <Link to="/customcv" className={styles.button}>
            {t('custom_cv')}
          </Link>
        )}

        <button onClick={handlePDF} className={styles.button}>
          {t('save_to_pdf')}
        </button>
        {/* <button onClick={handlePNG} className={styles.button}>
          Save to PNG
        </button> */}
      </div>
    </div>
  )
}

export default Index
