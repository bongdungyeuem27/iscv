import { IPFS_GATEWAY } from '@constants/index'
import { EBotCategory, IBotMessages } from '@redux/types/bot'
import React, { memo, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import clsx from 'clsx'

type Props = {
  messages: IBotMessages
}

const Task = ({ messages }: Props) => {
  const employeeId = useSelector((state: RootState) => state.auth.employee)!.id
  const navigate = useNavigate()
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
        navigate(`/profile/${employeeId}/mycv?tab=bigfive`)
        break
    }
  }

  return (
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
  )
}

export default memo(Task)
