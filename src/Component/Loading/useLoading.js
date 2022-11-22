import { eventEmitter } from './LoadingContainer'

export function useLoading() {
  const open = () => {
    eventEmitter.emit('open')
  }
  const close = () => {
    eventEmitter.emit('close')
  }
  return { open, close }
}
