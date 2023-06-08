import { API_ENDPOINT_NODEJS, IPFS_GATEWAY } from '@constants/index'
import { useToast } from '@iscv/toast'
import { RootState } from '@redux/store'
import clsx from 'clsx'
import { useContext, useEffect, useRef, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Dictaphone from './Dictaphone/Dictaphone'
import { useDictaphone } from './Dictaphone/useDictaphone'
import InterviewContextProvider, { EInterviewStatus, InterviewContext } from './InterviewContext'
import Question from './Question'
import Timer from './Timer'
import styles from './styles.module.scss'
import { useBot } from '@components/Bot/useBot'
import { MAX_QUESTION, MatchedAnswer, MatchedSpeech } from '@redux/types/interview'
import { addAnswer } from '@redux/reducers/interview'
import { v4 } from 'uuid'
import { debounce } from 'lodash'

const diffOfDate = (time1: Date, time2: Date) => {
  const timeDifference = Math.abs(time2.getTime() - time1.getTime())

  // Convert the time difference to minutes and seconds
  const minutes = Math.floor(timeDifference / (1000 * 60))
  const seconds = Math.floor((timeDifference / 1000) % 60)
  return {
    minutes,
    seconds
  }
}

type Props = {}

const Interview = (props: Props) => {
  const [expandVolume, setExpandVolume] = useState(false)
  const [micro, setMicro] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const dictaphone = useDictaphone()
  const toast = useToast()
  const employee = useSelector((state: RootState) => state.auth.employee)
  const { id } = useParams()
  const [isPending, startTransition] = useTransition()
  const [volume, setVolume] = useState(0)
  const dispatch = useDispatch()
  const introductionAudioRef = useRef<HTMLAudioElement>(null)
  const mainAudioRef = useRef<HTMLAudioElement>(null)
  const introductionDuration = useRef<
    | {
        minutes: number
        seconds: number
      }
    | undefined
  >(undefined)
  const mainDuration = useRef<
    | {
        minutes: number
        seconds: number
      }
    | undefined
  >(undefined)
  const currentQuestion = useRef<number>(0)

  const { socket, audioRef, status, setStatus } = useContext(InterviewContext)
  const bot = useBot()

  const handleNextQuestion = debounce(() => {
    const nextQuestion = currentQuestion.current + 1
    console.log(nextQuestion)
    if (nextQuestion > MAX_QUESTION) {
      socket?.emit('interview_stop', {}, () => {})
      return
    }

    currentQuestion.current = nextQuestion
    bot.stopAudioUrl()
    bot.openAudioUrl(`${API_ENDPOINT_NODEJS}public/interview/sound/${nextQuestion}.mp3`)
  }, 200)

  useEffect(() => {
    async function setup() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      videoRef.current!.srcObject = stream
      videoRef.current!.muted = true
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=h264,opus',
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2000000
      })
      mediaRecorder.ondataavailable = (event) => {}
      mediaRecorder.onstop = () => {}

      mediaRecorderRef.current = mediaRecorder
    }
    setup()
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('interview_introduction_end', (time) => {
      mainAudioRef.current?.play()
      setTimeout(() => {
        dictaphone.start()
        mainDuration.current = diffOfDate(new Date(), new Date(time))
        setStatus?.(2)
        handleNextQuestion()
      }, 1500)
    })
    socket.on('interview_main_end', (time) => {
      mediaRecorderRef.current?.stop()
      ;(videoRef.current?.srcObject as any)?.getTracks().forEach((track: { stop: () => void }) => {
        track.stop()
      })
      dictaphone.stop()
      setStatus?.(3)
    })
  }, [socket])

  useEffect(() => {
    if (status !== 1) return
    mediaRecorderRef.current!.ondataavailable = (event) => {
      console.log(event)
      socket?.emit('interview_chunk', { data: event.data }, () => {})
    }
    mediaRecorderRef.current!.onstop = () => {}
  }, [status === 1 || status === 2])

  const handleRunning = () => {
    if (!mediaRecorderRef.current) {
      toast.warning('Camera chưa sẵn sàng')
      return
    }

    if (status !== 0) return
    setStatus?.(EInterviewStatus.WAITING_INTRODUCTION)
    audioRef?.current?.pause()
    introductionAudioRef.current?.play()
    setTimeout(() => {
      socket?.emit('interview_start', { interviewId: id! }, (time) => {
        mediaRecorderRef.current?.start(500)
        console.log(time)
        const diff = diffOfDate(new Date(), new Date(time))
        console.log(diff)
        introductionDuration.current = diff
        setStatus?.(EInterviewStatus.INTRODUCTION)
      })
    }, 1500)

    return
  }

  const handleMicro = () => {
    startTransition(() => {
      if (micro) {
        videoRef.current!.muted = true
        setMicro(false)
      } else {
        videoRef.current!.muted = false
        setMicro(true)
      }
    })
  }
  const handleVolumeChange = (event: any) => {
    if (!videoRef.current) return
    const newVolume = Number(event.target.value)

    startTransition(() => {
      setVolume(newVolume)
    })
  }
  const handleTextChange = (text: string) => {
    const words = text.split(/\s+/)
    console.log(words)
    let founded: keyof typeof MatchedAnswer | undefined = undefined
    const foundedString = words.find((x: string) => Object.values(MatchedAnswer).includes(x))
    const foundedNumber = words.find((x: string) => Object.keys(MatchedAnswer).includes(x))
    if (foundedString !== undefined)
      founded = MatchedSpeech[
        foundedString as keyof typeof MatchedSpeech
      ] as keyof typeof MatchedAnswer
    else if (foundedNumber !== undefined)
      founded = Number(foundedNumber) as keyof typeof MatchedAnswer
    if (founded === undefined) return
    console.log('next')

    dispatch(
      addAnswer({
        id: v4(),
        question: currentQuestion.current,
        selected: founded
      })
    )
    console.log(founded)
    socket?.emit('interview_answer', { answer: founded }, () => {})
    handleNextQuestion()
  }

  return (
    <main className={styles.container}>
      <audio
        ref={introductionAudioRef}
        src={`${API_ENDPOINT_NODEJS}public/interview/sound/introduction.mp3`}
        controls
        className=" hidden absolute"
        autoPlay={false}
      />
      <audio
        ref={mainAudioRef}
        src={`${API_ENDPOINT_NODEJS}public/interview/sound/main.mp3`}
        controls
        className=" hidden absolute"
        autoPlay={false}
      />
      <div className={styles.left}>
        {/* <div className={styles.header}>
          <h3>Lorem ipsum dolor sit amet</h3>
        </div> */}

        {/* <div className={styles.invite}>
          <div className={styles.inviteLeft}>
            <div className={styles.inviteItem}>
              <i className="fa-regular fa-user-group"></i>
              <a>Invited to the call:</a>
              <div className={clsx(styles.inviteItemIndicator, styles.greenPositive)}>
                <div>6</div>
              </div>
            </div>
          </div>
          <div className={styles.inviteRight}>
            <button className={styles.inviteItem}>
              <div className={clsx(styles.inviteItemIndicator, styles.greenNegative)}>
                <i className="fa-regular fa-plus"></i>
              </div>
              <a className={styles.textGreen}>Add user to the call</a>
            </button>
          </div>
        </div> */}

        <div className={styles.main}>
          <div className={styles.user}>
            <img src={`${IPFS_GATEWAY}${employee?.sourceImage}`} alt="user" />
            <div className={styles.userInfo}>
              <div className={styles.userInfoProfessional}>{employee?.professional}</div>
              <div className={styles.userInfoName}>{employee?.name}</div>
            </div>
          </div>
          {status === EInterviewStatus.INTRODUCTION && (
            <Timer
              initialMinute={introductionDuration.current?.minutes}
              initialSeconds={introductionDuration.current?.seconds}
            ></Timer>
          )}
          {status === EInterviewStatus.MAIN && (
            <Timer
              initialMinute={mainDuration.current?.minutes}
              initialSeconds={mainDuration.current?.seconds}
            ></Timer>
          )}

          <div
            className={clsx(
              styles.volume,
              expandVolume ? styles.volumeAdjust : styles.volumeExpand
            )}
          >
            <input type="range" name="volume" value={volume} onChange={handleVolumeChange}></input>
            <i className="fa-solid fa-volume" onClick={() => setExpandVolume(!expandVolume)}></i>
          </div>

          <Dictaphone onTextChange={handleTextChange} />
          <div className={styles.toolBar}>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-expand"></i>
            </button>
            <button className={styles.toolItem} onClick={handleMicro}>
              <i className={clsx('fa-solid', micro ? 'fa-microphone' : 'fa-microphone-slash')}></i>
            </button>
            <button className={styles.finish} onClick={handleRunning}>
              {status === 0 && <i className="fa-solid fa-play"></i>}
              {status === 1.5 && <i className="fa-regular fa-loader"></i>}
              {/* {status === 1 || status === 2 && <i className="fa-solid fa-stop" onClick={handleRunning}></i>} */}
              {(status === 1 || status === 2) && <i className="fa-solid fa-minus"></i>}
            </button>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-screencast"></i>
            </button>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
          <div className={styles.videoWrapper}>
            <video className={styles.video} ref={videoRef} autoPlay></video>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Question></Question>
      </div>
    </main>
  )
}

const Wrapper = () => {
  return (
    <InterviewContextProvider>
      <Interview></Interview>
    </InterviewContextProvider>
  )
}

export default Wrapper
