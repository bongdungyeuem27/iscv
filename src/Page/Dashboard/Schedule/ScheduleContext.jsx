import { createContext, useState } from 'react'

export const ScheduleContext = createContext()

const ScheduleContextProvider = ({ children }) => {
  const [selectDate, setSelecteDate] = useState(new Date())
  const [forceUpdate, setForceUpdate] = useState(false)
  const data = { selectDate, setSelecteDate, forceUpdate, setForceUpdate }

  return <ScheduleContext.Provider value={data}>{children}</ScheduleContext.Provider>
}

export default ScheduleContextProvider
