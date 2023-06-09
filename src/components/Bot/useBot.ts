import { botListener } from './BotContext'

export const useBot = () => {
  const openAudioUrl = (url: string) => {
    botListener.emit('stopAudioUrl')
    botListener.emit('openAudioUrl', url)
  }
  const stopAudioUrl = () => {
    botListener.emit('stopAudioUrl')
  }

  return {
    stopAudioUrl,
    openAudioUrl
  }
}
