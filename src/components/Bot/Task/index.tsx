import { API_ENDPOINT_NODEJS, IPFS_GATEWAY } from '@constants/index'
import { EBotCategory, IBotMessages } from '@redux/types/bot'
import React, { memo, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import clsx from 'clsx'
import Modal from '@components/Modal'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import Button from '@components/Button'
import { useLoading } from '@components/Loading'
import { useToast } from '@iscv/toast'
import { useEmployee } from '@contracts/useEmployee'

type Props = {
  messages: IBotMessages
}

const Task = ({ messages }: Props) => {
  const employeeId = useSelector((state: RootState) => state.auth.employee)!.id
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const loading = useLoading()
  const toast = useToast()
  const signer = useSelector((state: RootState) => state.auth.signer)
  const text = useRef<string>(
    (() => {
      switch (messages?.category) {
        case EBotCategory.NEW_INTERVIEW:
          return `Bạn có một lịch phỏng vấn mới từ ${moment(messages.metadata?.fromTime).format(
            'DD/MM/YYYY'
          )} đến ${moment(messages.metadata?.toTime).format('DD/MM/YYYY')}`

        case EBotCategory.NEW_BIGFIVE_RESULT:
          return 'Bạn có một kết quả từ khảo sát Big Five'
        default:
          return messages?.content || ''
      }
    })()
  )
  const handleClick = () => {
    switch (messages.category) {
      case EBotCategory.NEW_INTERVIEW:
        navigate(`/interview/${messages.metadata?._id}`)
        break
      case EBotCategory.NEW_BIGFIVE_RESULT:
        setShowModal(true)
        break
    }
  }

  return (
    <>
      {showModal && (
        <Modal
          setShow={setShowModal}
          title={
            <div className="flex justify-end w-full mr-16">
              <Button
                onClick={async () => {
                  loading.open()

                  const contractEmployee = useEmployee(signer!)
                  console.log(employeeId, messages.sessionId!, messages.metadata!.cid!)
                  await contractEmployee
                    .addBigFive(employeeId, messages.sessionId!, messages.metadata!.cid!)
                    .then(async (tx) => {
                      await tx
                        .wait()
                        .then((success) => console.log(success))
                        .catch((error) => console.log(error))
                    })
                    .catch((error) => console.log(error))
                  loading.close()
                }}
              >
                Thêm vào blockchain
              </Button>
            </div>
          }
        >
          <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'}>
            <Viewer
              fileUrl={`${API_ENDPOINT_NODEJS}machine/interview/${messages.sessionId}/report.pdf`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </Modal>
      )}
      <div className="w-full">
        <div
          className={clsx(
            'flex rounded-2xl shadow-xl px-2 py-1 gap-3 items-center overflow-hidden cursor-pointer',
            {
              'bg-gradient-red': messages.category === EBotCategory.NEW_INTERVIEW
            },
            {
              'bg-gradient-green': messages.category === EBotCategory.NEW_BIGFIVE_RESULT
            }
          )}
          onClick={handleClick}
        >
          <img
            src={`${IPFS_GATEWAY}${messages.metadata?.businessImage}`}
            className=" h-full min-h-8 aspect-square rounded-full object-cover"
          ></img>
          <div className="flex px-2 py-1 rounded-t-2xl  gap-3 items-center overflow-hidden">
            <div className="rounded-2xl">
              <p className={styles.banner}>{text.current}</p>
            </div>
          </div>
        </div>
        <span className=" text-[12px] text-gray-600 leading-3">
          {moment(messages.time).format('HH:ss')}
        </span>
      </div>
    </>
  )
}

export default memo(Task)
