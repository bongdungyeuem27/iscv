import { createContext, useState } from 'react'

export const ProfileContext = createContext()

const ProfileContextProvider = ({ children }) => {
  const [tab, setTab] = useState(1)
  const data = { tab, setTab }

  return <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>
}

export default ProfileContextProvider
