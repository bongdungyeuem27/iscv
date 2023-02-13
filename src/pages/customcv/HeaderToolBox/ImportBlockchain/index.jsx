import React, { memo, useRef, useEffect, useContext, useState } from 'react'
import { Modal } from '@iscv/modal'
import styles from './styles.module.scss'
import html2canvas from 'html2canvas'
import { useReactToPrint } from 'react-to-print'
import { CustomCVContext } from '../../CustomCVContext'
import useToJson from '../../hooks/useToJson'
import { getContract as getContractCV } from '@contract/cvController'
import { Web3Context } from '@context/Web3ContextProvider'
import useToObject from '../../hooks/useToObject'

function Index(props) {
  const [open, setOpen] = props.state
  const { autoCreatement, list, setList, setAutoCreatement } = useContext(CustomCVContext)
  const { loginState } = useContext(Web3Context)
  const [listCV, setListCV] = useState()
  useEffect(() => {
    if (!open) return
    getContractCV()
      .then((contractCV) => {
        contractCV.methods
          .getListCVByEmployeeId(loginState.id)
          .call()
          .then((success) => {
            let temp = success.map((value, index) => {
              return { ...value }
            })
            setListCV(temp)
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }, [open])
  const handleSetList = (index) => {
    let result = useToObject(listCV[index].data)
    setAutoCreatement(result.autoCreatement)
    setList(result.list)
    setOpen(false)
  }
  return (
    <Modal state={[open, setOpen]} title={'download'}>
      <div className={styles.container}>
        {listCV?.map((value, index) => {
          return (
            <div onClick={() => handleSetList(index)} key={index} className={styles.item}>
              <i className="fa-light fa-start"></i>
              <a> Record at {new Date(parseInt(value.time) * 1000).toLocaleString()}</a>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

export default memo(Index)
