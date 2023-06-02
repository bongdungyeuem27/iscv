import { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { addItem } from '@redux/reducers/messages'

type Props = {
  //
}

const TextInput = (props: Props) => {
  const [input, setInput] = useState<string>('')
  const client = useSelector((state: RootState) => state.socket.client)
  const employeeId = useSelector((state: RootState) => state.auth.employee)?.id!
  const dispatch = useDispatch()
  return (
    <div className={styles.chatInput}>
      <div className={styles.chatType}>
        <textarea
          onChange={(e) => {
            e.target.style.height = 'inherit'
            e.target.style.height = `${e.target.scrollHeight}px`
            setInput(e.target.value)
          }}
          value={input}
          rows={1}
          placeholder="Typing here ..."
        ></textarea>
      </div>
      <div
        onClick={() => {
          client?.emit('receive', { businessId: 0, employeeId, content: input }, (data) => {
            dispatch(addItem(data))
          })

          setInput('')
        }}
        className={styles.chatSend}
      >
        <i className="fa-solid fa-paper-plane-top"></i>
      </div>
    </div>
  )
}

export default TextInput
