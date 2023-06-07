type WithTimeoutAck<isSender extends boolean, args extends any[]> = isSender extends true
  ? [Error, ...args]
  : args

interface ClientToServerEvents<isSender extends boolean = false> {
  interview_start: (
    arg: {
      interviewId: string
    },
    callback: (data: any) => void
  ) => void
  interview_main_start: (
    arg: {
      //
    },
    callback: (data: any) => void
  ) => void
  interview_main_chunk: (
    arg: {
      data: Blob
    },
    callback: (data: any) => void
  ) => void
  interview_introduction_start: (
    arg: {
      //
    },
    callback: (introductionTime: Date) => void
  ) => void
  interview_introduction_chunk: (
    arg: {
      data: Blob
    },
    callback: (data: any) => void
  ) => void
  interview_introduction_stop: (
    arg: {
      //
    },
    callback: (data: any) => void
  ) => void
}

interface ServerToClientEvents<isSender extends boolean = false> {
  interview_introduction_end: (time: number) => void
  // interview_main: (time: number) => void;
  interview_main_end: (time: number) => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  name: string
  age: number
}
