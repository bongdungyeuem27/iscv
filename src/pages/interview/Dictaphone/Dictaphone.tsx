import React, { useEffect, useRef } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import styles from '../styles.module.scss'
import clsx from 'clsx'
import EventEmitter from 'events'

function getLastSevenWords(str: string) {
  // Split the string into an array of words
  const words = str.split(' ')

  // Calculate the starting index based on the length of the array
  const startIndex = Math.max(0, words.length - 7)

  // Extract the last 7 words from the array
  const lastSevenWords = words.slice(startIndex)

  // Join the words back into a string
  const result = lastSevenWords.join(' ')

  return result
}

export const dictaphoneListener = new EventEmitter()

const Dictaphone = ({
  onTextChange
}: {
  onTextChange: (newText: string, currentText: string) => void
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript
  } = useSpeechRecognition({
    clearTranscriptOnListen: true
  })
  const previousTranscriptRef = useRef('')

  useEffect(() => {
    const newTranscript = transcript.replace(previousTranscriptRef.current, '')
    previousTranscriptRef.current = transcript
    if (newTranscript.trim() !== '') {
      onTextChange(newTranscript, transcript)
    }
  }, [transcript])

  useEffect(() => {
    dictaphoneListener.on('start', () => {
      SpeechRecognition.startListening({
        language: 'vi-VN',
        continuous: true,
        interimResults: true
      })
    })
    dictaphoneListener.on('stop', () => {
      SpeechRecognition.stopListening()
    })
  }, [])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div className={clsx('absolute px-4 py-2 rounded-xl bottom-24 max-w-[500px]', styles.blur)}>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      {/* <button
        onClick={() =>
          SpeechRecognition.startListening({
            language: 'vi-VN',
            continuous: true,
            interimResults: true
          })
        }
      >
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <div className="">
        <p className="text-white">{getLastSevenWords(transcript)}</p>
      </div>
      {/* <p>{transcript}</p> */}
    </div>
  )
}

export default Dictaphone
