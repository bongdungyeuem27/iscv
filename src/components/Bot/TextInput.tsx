import { addItem } from '@redux/reducers/bot'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ERole } from 'src/types/messages'
import { v4 } from 'uuid'

type Props = {
  //
}

const TextInput = (props: Props) => {
  const [input, setInput] = useState<string>('')
  const dispatch = useDispatch()
  return (
    <div className="flex justify-between w-full relative border-t-[1px]">
      <textarea
        className="flex-1  w-full max-w-xs min-h-[16px] px-5 py-3 resize-none order-transparent focus:border-transparent focus:ring-0 focus:outline-none "
        onChange={(e) => {
          e.target.style.height = 'inherit'
          e.target.style.height = `${e.target.scrollHeight}px`
          setInput(e.target.value)
        }}
        value={input}
        rows={1}
        placeholder="Typing here ..."
      ></textarea>
      <button
        className="btn btn-circle btn-info absolute right-3 top-[-23px]"
        onClick={() => {
          if (!input) return
          dispatch<any>(
            addItem({
              _id: v4(),
              role: ERole.EMPLOYEE,
              content: input,
              time: new Date()
            })
          )
          setInput('')
        }}
      >
        <i className="fa-solid fa-paper-plane text-white text-xl"></i>
      </button>
    </div>
  )
}

export default TextInput
