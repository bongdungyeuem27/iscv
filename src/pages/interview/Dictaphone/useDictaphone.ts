import { dictaphoneListener } from './Dictaphone'

export const useDictaphone = () => {
  return {
    start: function () {
      dictaphoneListener.emit('start')
    },
    stop: function () {
      dictaphoneListener.emit('stop')
    }
  }
}
