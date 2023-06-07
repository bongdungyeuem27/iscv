import { API_ENDPOINT_NODEJS } from '@constants/index'
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
}

export const InterviewContext = createContext<IContext>({})

export enum EInterviewStatus {
  NONE,
  INTRODUCTION,
  MAIN,
  STOPPED
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
  const dispatch = useDispatch()
  const audioRef = useRef<HTMLAudioElement>(null)
  const data = {
    socket,
    audioRef,
    status,
    setStatus
  }
  useEffect(() => {
    if (employee?.id === undefined) return
    const client: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_ENDPOINT_NODEJS, {
      query: { employeeId: employee?.id }
    })
    setSocket(client)

    const timeoutId = setTimeout(() => {
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
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [employee?.id])

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
