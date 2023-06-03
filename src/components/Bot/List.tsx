import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import ChatItem from './ChatItem'
type Props = {
  //
}

const List = (props: Props) => {
  const list = useSelector((state: RootState) => state.bot.list)
  return (
    <div className="flex-1 w-full max-h-full bg-blue-50 overflow-hidden overflow-y-scroll p-3">
      {list?.map((value) => {
        return <ChatItem key={value._id} messages={value}></ChatItem>
      })}
    </div>
  )
}

export default List
