import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import ChatItem from './ChatItem'
import { EBotCategory } from '@redux/types/bot'
import Task from './Task'
type Props = {
  //
}

const List = (props: Props) => {
  const list = useSelector((state: RootState) => state.bot.list)
  return (
    <div className="flex-1 w-full max-h-full bg-blue-50 overflow-hidden overflow-y-scroll p-3 gap-3 flex flex-col-reverse">
      {list?.map((value) => {
        if (value.category === EBotCategory.NEW_INTERVIEW)
          return <Task key={value._id} messages={value}></Task>
        return <ChatItem key={value._id} messages={value}></ChatItem>
      })}
    </div>
  )
}

export default List
