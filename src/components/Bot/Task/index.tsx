import { IPFS_GATEWAY } from '@constants/index'
import { EBotCategory, IBotMessages } from '@redux/types/bot'
import React from 'react'
import styles from './styles.module.scss'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

type Props = {
  messages: IBotMessages
}

const Task = ({ messages }: Props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    switch (messages.category) {
      case EBotCategory.NEW_INTERVIEW:
        navigate(`/interview/${messages.metadata?._id}`)
        break
    }
  }
  return (
    <div className="w-full">
      <div
        className="flex rounded-2xl shadow-xl px-2 py-1 bg-gradient-red gap-3 items-center overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={`${IPFS_GATEWAY}${messages.metadata?.businessImage}`}
          className=" h-full min-h-8 aspect-square rounded-full object-cover"
        ></img>
        <div className="flex px-2 py-1 rounded-t-2xl  gap-3 items-center overflow-hidden">
          <div className="rounded-2xl">
            <p className={styles.banner}>
              {messages?.category === EBotCategory.NEW_INTERVIEW
                ? `Bạn có một lịch phỏng vấn mới từ ${moment(messages.metadata?.fromTime).format(
                    'DD/MM/YYYY'
                  )} đến ${moment(messages.metadata?.toTime).format('DD/MM/YYYY')} với ${
                    messages.metadata?.businessName
                  }`
                : messages?.content}
            </p>
          </div>
        </div>
      </div>
      <span className=' text-[12px] text-gray-600 leading-3'>{moment(messages.time).format('HH:ss')}</span>
    </div>
  )
}

export default Task
