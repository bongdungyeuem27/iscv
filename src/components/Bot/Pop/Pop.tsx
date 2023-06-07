import { RootState } from '@redux/store'
import { EBotCategory } from '@redux/types/bot'
import clsx from 'clsx'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { botListener } from '../BotContext'
import { ERole } from 'src/types/messages'

type Props = {
  //
}

const Pop = (props: Props) => {
  const newest = useSelector((state: RootState) => state.bot.list).at(0)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (newest?.role === ERole.BUSINESS) setOpen(true)
  }, [newest])
  const handleOpen = () => {
    setOpen(false)
    botListener.emit('open')
  }
  const text =
    newest?.category === EBotCategory.NEW_INTERVIEW
      ? `Bạn có một lịch phỏng vấn mới từ ${moment(newest.metadata?.fromTime).format(
          'DD/MM/YYYY'
        )} đến ${moment(newest.metadata?.toTime).format('DD/MM/YYYY')}`
      : newest?.content
  return (
    <div
      className={clsx(
        ' fixed bottom-[30px] cursor-pointer overflow-hidden shadow-2xl whitespace-nowrap rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl z-101 right-[130px] transition-all duration-500  bg-white flex justify-start flex-col ',
        { 'invisible w-0 min-w-0': !open },
        styles.rainbow,
        styles.container,
        { ['!min-w-max visible w-auto']: open }
      )}
      onClick={handleOpen}
    >
      <div className="m-[4px] max-w-[500px] overflow-hidden bg-white flex-1 rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] flex items-center px-2]">
        <div className=" rounded-xl whitespace-nowrap max-w-[500px]">
          <h4
            className={clsx('text-md font-medium text-gray-600', {
              [styles.banner]: text?.length || 0 > 100
            })}
          >
            {text}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Pop
