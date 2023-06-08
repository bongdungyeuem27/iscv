import { Socket } from 'socket.io-client'
import { IMesssages } from './messages'
import { ERole } from 'src/types/messages'

type WithTimeoutAck<isSender extends boolean, args extends any[]> = isSender extends true
  ? [Error, ...args]
  : args

export interface ClientToServerEvents<isSender extends boolean = false> {
  receive: (
    arg: {
      businessId?: number
      employeeId?: number
      content: string
    },
    callback: (data: IMesssages) => void
  ) => void
  hello: (arg: number, callback: (...args: WithTimeoutAck<isSender, [string]>) => void) => void
}

export interface ServerToClientEvents<isSender extends boolean = false> {
  // ...
  noArg: () => void
  send: (data: {
    _id: string
    employeeId?: number
    businessId?: number
    content: string
    role: ERole
  }) => void
  interview_result: (args?: any) => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  name: string
  age: number
}

export type ISocketStore = {
  client?: Socket<ServerToClientEvents, ClientToServerEvents>
}

export type SocketInput = { employeeId: number }
export type SocketOutput = { client: Socket }
