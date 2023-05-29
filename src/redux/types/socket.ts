import { Socket } from "socket.io-client";
import { IMesssages } from "./messages";

type WithTimeoutAck<
  isSender extends boolean,
  args extends any[]
> = isSender extends true ? [Error, ...args] : args;

interface ClientToServerEvents<isSender extends boolean = false> {
  receive: (
    arg: {
      businessId?: number;
      employeeId?: number;
      content: string;
    },
    callback: (data: IMesssages) => void
  ) => void;
  hello: (
    arg: number,
    callback: (...args: WithTimeoutAck<isSender, [string]>) => void
  ) => void;
}

interface ServerToClientEvents<isSender extends boolean = false> {
  // ...
  noArg: () => void;
  send: (data: {
    _id: string;
    employeeId?: number;
    businessId?: number;
    content: string;
  }) => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export type ISocketStore = {
  client?: Socket<ServerToClientEvents, ClientToServerEvents>;
};

export type SocketInput = { employeeId: number };
export type SocketOutput = { client: Socket };
