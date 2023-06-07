import React, { useContext, useEffect, useRef, useState, useTransition } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { Modal } from '@iscv/modal'
import Question from './Question'
import Webcam from 'react-webcam'
import io from 'socket.io-client'
import { API_ENDPOINT_NODEJS, IPFS_GATEWAY } from '@constants/index'
import { useToast } from '@iscv/toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import Timer from './Timer'
import InterviewContextProvider, { EInterviewStatus, InterviewContext } from './InterviewContext'
import { ERole } from 'src/types/messages'
import { v4 } from 'uuid'
import { addItem } from '@redux/reducers/bot'
import { EBotCategory } from '@redux/types/bot'
import { useParams } from 'react-router-dom'

type Props = {}

const Interview = (props: Props) => {
  const [expandVolume, setExpandVolume] = useState(false)
  const [micro, setMicro] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const toast = useToast()
  const employee = useSelector((state: RootState) => state.auth.employee)
  const { id } = useParams()
  const [isPending, startTransition] = useTransition()
  const [volume, setVolume] = useState(0)
  const dispatch = useDispatch()
  const introductionAudioRef = useRef<HTMLAudioElement>(null)
  const mainAudioRef = useRef<HTMLAudioElement>(null)

  const { socket, audioRef, status, setStatus } = useContext(InterviewContext)

  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      videoRef.current!.srcObject = stream
      videoRef.current!.muted = true
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=h264,opus',
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000
      })
      mediaRecorder.ondataavailable = (event) => {
        // client?.emit("chunk-interview", event.data);
      }
      mediaRecorder.onstop = () => {}

      mediaRecorderRef.current = mediaRecorder
    }

    setupCamera()
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('interview_main_end', (time) => {
      setStatus?.(3)
    })
    socket.on('interview_introduction_end', (time) => {
      mainAudioRef.current?.play()
      setTimeout(() => {
        setStatus?.(2)
      }, 1500)
    })
  }, [socket])

  useEffect(() => {
    if (status !== 1) return
    mediaRecorderRef.current!.ondataavailable = (event) => {
      console.log(event)
      socket?.emit('interview_introduction_chunk', { data: event.data }, () => {})
    }
    mediaRecorderRef.current!.onstop = () => {}
  }, [status])

  useEffect(() => {
    if (status !== 2) return

    mediaRecorderRef.current!.ondataavailable = (event) => {
      socket?.emit('interview_main_chunk', { data: event.data }, () => {})
    }
    mediaRecorderRef.current!.onstop = () => {}
  }, [status])
  console.log(status)

  const handleRunning = () => {
    if (!mediaRecorderRef.current) {
      toast.warning('Camera chưa sẵn sàng')
      return
    }

    if (status !== 0) return

    audioRef?.current?.pause()
    introductionAudioRef.current?.play()
    setTimeout(() => {
      socket?.emit('interview_start', { interviewId: id! }, (time) => {
        mediaRecorderRef.current?.start(500)
        console.log(time)
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
        <div className={styles.header}>
          <h3>Lorem ipsum dolor sit amet</h3>
        </div>

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
            <Timer initialMinute={1} initialSeconds={30}></Timer>
          )}
          {status === EInterviewStatus.MAIN && (
            <Timer initialMinute={13} initialSeconds={30}></Timer>
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

          <div className={styles.toolBar}>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-expand"></i>
            </button>
            <button className={styles.toolItem} onClick={handleMicro}>
              <i className={clsx('fa-solid', micro ? 'fa-microphone' : 'fa-microphone-slash')}></i>
            </button>
            <button className={styles.finish} onClick={handleRunning}>
              {status === 0 && <i className="fa-solid fa-play"></i>}
              {/* {status === 1 || status === 2 && <i className="fa-solid fa-stop" onClick={handleRunning}></i>} */}
              {status !== 0 && <i className="fa-solid fa-minus"></i>}
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
