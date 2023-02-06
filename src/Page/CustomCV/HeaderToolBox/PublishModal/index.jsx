import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { Modal } from '@iscv/modal'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { handlePublishTemplate } from './handleHook'
import { Web3Context } from '@context/Web3ContextProvider'
import { CustomCVContext } from '../../CustomCVContext'

function Index(props) {
  const [open, setOpen] = props.state
  const { loginState } = useContext(Web3Context)
  const { autoCreatement, list } = useContext(CustomCVContext)
  const formik = useFormik({
    initialValues: {
      nftName: '',
      nftPrice: 0,
    },
    validationSchema: Yup.object({
      nftName: Yup.string().required('required'),
      nftPrice: Yup.number(),
    }),
    onSubmit: async (values) => {
      await handlePublishTemplate({
        address: loginState.address,
        nftName: values.nftName,
        nftPrice: values.nftPrice,
        autoCreatement,
        list,
      })
        .then((success) => {
          setOpen(false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  })

  return (
    <Modal state={[open, setOpen]} title={'Publish NFT'} action={formik.handleSubmit}>
      <div className={styles.container}>
        <div className={styles.item}>
          <label className={styles.nftNameLabel} htmlFor={'nftName'}>
            NFT Name
          </label>
          <input
            className={styles.nftNameInput}
            type="text"
            name={'nftName'}
            value={formik.values.nftName}
            onChange={formik.handleChange}
          ></input>
          <p>{formik.errors.nftName}</p>
        </div>
        <div className={styles.item}>
          <label className={styles.nftPriceLabel} htmlFor={'nftPrice'}>
            NFT Price
          </label>
          <input
            className={styles.nftPriceInput}
            type="number"
            name={'nftPrice'}
            value={formik.values.nftPrice}
            onChange={formik.handleChange}
          ></input>
          <p>{formik.errors.nftPrice}</p>
        </div>
      </div>
    </Modal>
  )
}

export default Index
