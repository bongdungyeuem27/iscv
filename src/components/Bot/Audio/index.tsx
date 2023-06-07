import React, { useEffect, useRef, useState } from 'react'
import { botListener } from '../BotContext'

type Props = {}

const Audio = (props: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [url, setURL] = useState<string | undefined>(undefined)
  useEffect(() => {
    botListener.on('openAudioUrl', (url: string) => {
      setURL(url)

      setTimeout(() => {
        audioRef.current?.play()
      }, 200)
    })
    botListener.on('stopAudioUrl', () => {
      audioRef.current?.pause()
    })
  }, [])

  return (
    <div className="hidden absolute">
      <audio ref={audioRef} src={url} controls className=" hidden absolute" autoPlay={false} />
    </div>
  )
}

export default Audio
