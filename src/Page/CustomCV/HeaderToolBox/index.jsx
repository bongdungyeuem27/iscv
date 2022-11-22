import React, {
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  lazy,
  Suspense,
  useCallback,
} from 'react'
import styles from './styles.module.scss'
import Button from './Button'
import Logo from './Logo'
import clsx from 'clsx'
import ObjectName from './ObjectName'
import { CustomCVContext } from '../CustomCVContext'
import update from 'immutability-helper'
import { useToast } from '@component/Toast'
const DownloadModal = lazy(() => import('./DownloadModal'))
const PublishModal = lazy(() => import('./PublishModal'))
import { getContract as getCVContract } from '@contract/cvController'
import { useLoading } from '@component/Loading'
import useToObject from '../hooks/useToObject'
import { Web3Context } from '@context/Web3ContextProvider'
import useToJson from '../hooks/useToJson'


const ImportBlockchain = lazy(() => import('./ImportBlockchain'))

function Index() {
  const {
    selected,
    setSelected,
    setList,
    list,
    copy,
    setCopy,
    autoCreatement,
    getNewAutoCreatement,
    setAutoCreatement,
  } = useContext(CustomCVContext)
  const { loginState } = useContext(Web3Context)
  const toast = useToast()
  const [openModalDownload, setOpenModalDownload] = useState(false)
  const [openModalPublish, setOpenModalPublish] = useState(false)
  const [openImportBlockchain, setOpenImportBlockchain] = useState(false)
  const fileImportRef = useRef()
  const loading = useLoading()
  const handleCopy = () => {
    if (list[selected]) {
      setCopy({ ...list[selected] })
      toast.success('copy', {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }
  const handlePaste = () => {
    if (copy) {
      let newId = getNewAutoCreatement()
      let newName = copy.type.toString()
      newName = newName[0].toUpperCase() + newName.slice(1)
      newName += ' ' + newId
      let temp = { ...copy, top: copy.top + 10, left: copy.left + 10, name: newName }
      setList(update(list, { $merge: { [newId]: temp } }))
      setSelected(newId)
      toast.success('paste', {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }
  const handleDelete = () => {
    if (selected) {
      const { [selected]: _, ...newData } = list
      setList(newData)
      setSelected(undefined)
      toast.success('delete', {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }
  const handleCut = () => {
    if (list[selected]) {
      setCopy({ ...list[selected] })
      const { [selected]: _, ...newData } = list
      setList(newData)
      setSelected(undefined)
      toast.success('cut', {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }
  const openUpload = () => {
    fileImportRef.current.click()
  }
  const handleDeploy = async () => {
    loading.open()
    await getCVContract()
      .then(async (contractCV) => {
        await contractCV.methods
          .addCV(loginState.id, JSON.stringify(useToJson(autoCreatement, list)))
          .send({ from: loginState.address })
          .then((success) => {
            toast.success('success', { pauseOnHover: true.valueOf, closeOnClick: true })
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => {
        console.error(error)
      })
    loading.close()
  }
  const handleChange = (e) => {
    if (e.target.value) {
      fileReader.readAsText(e.target.files[0], 'UTF-8')
      fileReader.onload = (e) => {
        let data = useToObject(e.target.result)
        setAutoCreatement(data.autoCreatement)
        setList(data.list)
      }
    }
  }

  return (
    <>
      <input
        type="file"
        id="file"
        multiple={false}
        accept="application/JSON"
        onChange={handleChange}
        ref={fileImportRef}
        style={{ display: 'none' }}
      />

      <Suspense fallback={<div></div>}>
        <DownloadModal state={[openModalDownload, setOpenModalDownload]}></DownloadModal>
        <PublishModal state={[openModalPublish, setOpenModalPublish]}></PublishModal>
        <ImportBlockchain
          state={[openImportBlockchain, setOpenImportBlockchain]}
        ></ImportBlockchain>
      </Suspense>

      <div className={styles.container}>
        <div className={styles.left}>
          <Logo></Logo>
          <Button onClick={handlePaste} icon={'fa-thin fa-paste'}></Button>
          <Button onClick={handleCopy} icon={'fa-thin fa-copy'}></Button>

          <Button onClick={handleCut} icon={'fa-thin  fa-scissors'}></Button>
          <Button onClick={handleDelete} icon={'fa-thin fa-trash-can'}></Button>

          <Button icon=""></Button>
          <Button></Button>
          <Button></Button>
        </div>

        <div className={styles.targetContainer}>
          <ObjectName></ObjectName>
        </div>
        <div className={styles.right}>
          <Button
            onClick={() => setOpenImportBlockchain(true)}
            icon="fa-thin fa-cloud-arrow-down"
          ></Button>
          <Button onClick={openUpload} icon="fa-thin fa-file-arrow-up"></Button>
          <Button onClick={setOpenModalDownload} icon="fa-thin fa-file-arrow-down"></Button>
          <Button onClick={()=>setOpenModalPublish(true)} icon="fa-thin fa-upload"></Button>
          <Button onClick={handleDeploy} icon="fa-thin fa-cloud-arrow-up"></Button>
        </div>
      </div>
    </>
  )
}
export default Index
