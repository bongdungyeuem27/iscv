import { createContext, useState, useReducer } from 'react'
import { tabs } from './config'

export const TabContext = createContext()

const TabContextProvider = ({ children }) => {
  const [tab, setTab] = useState(Object.keys(tabs)[0])
  const data = { tab, setTab }

  return <TabContext.Provider value={data}>{children}</TabContext.Provider>
}

export default TabContextProvider
