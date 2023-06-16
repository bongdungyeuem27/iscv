interface ClientToServerEvents<isSender extends boolean = false> {
  interview_start: (
    arg: {
      sessionId: number
    },
    callback?: (data: number, status: boolean) => void
  ) => void

  interview_chunk: (
    arg?: {
      data: Blob
    },
    callback?: (data: any) => void
  ) => void
  interview_stop: (
    arg?: {
      //
    },
    callback?: (data: any) => void
  ) => void

  interview_answer: (
    arg: {
      answer: number
    },
    callback: (data: any) => void
  ) => void
}

interface ServerToClientEvents<isSender extends boolean = false> {
  interview_introduction_end: (time: number) => void
  interview_main_end: (time: number) => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  name: string
  age: number
}
