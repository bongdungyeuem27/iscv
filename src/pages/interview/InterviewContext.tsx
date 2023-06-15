import { getLastestSessionId } from '@apis/employee/bigfive'
import { API_ENDPOINT_NODEJS } from '@constants/index'
import { useEmployee } from '@contracts/useEmployee'
import { useToast } from '@iscv/toast'
import { addItem } from '@redux/reducers/bot'
import { RootState } from '@redux/store'
import { EBotCategory } from '@redux/types/bot'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket, io } from 'socket.io-client'
import { ERole } from 'src/types/messages'
import { v4 } from 'uuid'

type IContext = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
  audioRef?: React.RefObject<HTMLAudioElement>
  status?: EInterviewStatus
  setStatus?: React.Dispatch<React.SetStateAction<EInterviewStatus>>
  sessionId?: React.MutableRefObject<number | undefined>
}

export const InterviewContext = createContext<IContext>({})

export enum EInterviewStatus {
  NONE = 0,
  WAITING_INTRODUCTION = 1.5,
  INTRODUCTION = 1,
  MAIN = 2,
  STOPPED = 3
}

type Props = {
  children: React.ReactNode
}
const InterviewContextProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >(undefined)
  const [status, setStatus] = useState(EInterviewStatus.NONE)
  const employee = useSelector((state: RootState) => state.auth.employee)
  const sessionId = useRef<number | undefined>(undefined)
  const dispatch = useDispatch()
  const toast = useToast()
  const audioRef = useRef<HTMLAudioElement>(null)
  const data = {
    socket,
    audioRef,
    status,
    setStatus,
    sessionId
  }
  useEffect(() => {
    if (sessionId === undefined) return
    let timeoutId: NodeJS.Timeout | undefined = undefined
    ;(async () => {
      const client: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_ENDPOINT_NODEJS, {
        query: { employeeId: employee?.id }
      })
      setSocket(client)

      timeoutId = setTimeout(() => {
        dispatch(
          addItem({
            _id: v4(),
            role: ERole.BUSINESS,
            category: EBotCategory.INTERVIEW_DIRECTION,
            content:
              'Xin chào bạn đến với phỏng vấn của ISCV, bạn sẽ có 15 phút, sau khi nghe hiệu lệnh bắt đầu, bạn sẽ có 1 phút 30 giây để tự giới thiệu bản thân. Sau đó bạn sẽ có 13 phút 30 giây để hỏi và trả lời các câu hỏi. Bạn sẽ có 5 lựa chọn 1 là không đồng ý, 2 là hơi đồng ý, 3 là trung lập, 4 là hơi đồng ý, 5 là rất đồng ý. Bạn sẽ phải chọn 1 trong 5 con số.  Mỗi câu hỏi sẽ trả lời một lần duy nhất. Nếu bạn đã sẵn sàng, bấm vào nút Play để bắt đầu',
            time: new Date()
          })
        )
        audioRef?.current?.play()
      }, 2000)
    })().catch((error) => {
      console.log(error)
      if (error.message.includes('not different 7 days'))
        toast.error('Khoảng cách giữa 2 lần phỏng vấn phải ít nhất 7 ngày')
    })

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [sessionId])

  return (
    <InterviewContext.Provider value={data}>
      <audio
        ref={audioRef}
        src={`${API_ENDPOINT_NODEJS}public/interview/sound/direction.mp3`}
        controls
        className=" hidden absolute"
        autoPlay={false}
      />
      {children}
    </InterviewContext.Provider>
  )
}

export default InterviewContextProvider
