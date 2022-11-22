import { createContext, useState, useEffect, useContext, useRef } from 'react'
import { Web3Context } from '@context/Web3ContextProvider'

import socketIOClient from 'socket.io-client'
import { API_ENDPOINT_NODEJS } from '@constant/index'
import { useParams } from 'react-router-dom'
import generate from '@helper/generate'
export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const { loginState } = useContext(Web3Context)
  const [forceUpdate, setForceUpdate] = useState(false)
  const id = parseInt(useParams().id)
  const [list, setList] = useState([])

  const lastSend = useRef({
    _idEmployee: 0,
    _idBusiness: 0,
    date: 0,
  })
  const socketRef = useRef()
  useEffect(() => {
    socketRef.current = socketIOClient.connect(API_ENDPOINT_NODEJS)
    if (loginState.for == 'business') {
      socketRef.current.on('businessSendSuccess' + loginState.id, (data) => {
        lastSend.current = data
        setList((e) => {
          return [...e, data]
        })
        setForceUpdate((e) => !e)
      })
      socketRef.current.on('businessRecive' + loginState.id, (data) => {
        if (data.employeeId == id) {
          setList((e) => {
            return [...e, data]
          })
          setForceUpdate((e) => !e)
        }
      })
    }
    if (loginState.for == 'employee') {
      socketRef.current.on('employeeSendSuccess' + loginState.id, (data) => {
        lastSend.current = data
        setList((e) => {
          return [...e, data]
        })
        setForceUpdate((e) => !e)
      })
      socketRef.current.on('employeeRecive' + loginState.id, (data) => {
        if (data.businessId == id) {
          setList((e) => {
            return [...e, data]
          })
        }
        setForceUpdate((e) => !e)
      })
    }

    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  const handleSend = (content) => {
    if (!content || /^\s*$/.test(content)) {
      return
    }
    if (loginState.for == 'employee') {
      let data = {
        _idEmployee:
          new Date().getTime() - lastSend.current?.date <= 5 * 60 * 60
            ? lastSend.current?._idEmployee
            : undefined,
        _idBusiness:
          new Date().getTime() - lastSend.current?.date <= 5 * 60 * 60
            ? lastSend.current?._idBusiness
            : undefined,
        employeeId: loginState.id,
        businessId: id,
        type: true,
        content: content,
      }
      socketRef.current.emit('employeeSend', data)
    }

    if (loginState.for == 'business') {
      let data = {
        _idEmployee:
          new Date().getTime() - lastSend.current?.date <= 5 * 60 * 60
            ? lastSend.current?._idEmployee
            : undefined,
        _idBusiness:
          new Date().getTime() - lastSend.current?.date <= 5 * 60 * 60
            ? lastSend.current?._idBusiness
            : undefined,
        employeeId: id,
        businessId: loginState.id,
        type: true,
        content: content,
      }
      socketRef.current.emit('businessSend', data)
    }
  }
  const data = { list, setList, socketRef, handleSend, forceUpdate, setForceUpdate }
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>
}

export default ChatContextProvider
