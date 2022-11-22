import { createContext, useState } from 'react'

export const SocialContext = createContext()

const SocialContextProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const data = { search, setSearch }

  return <SocialContext.Provider value={data}>{children}</SocialContext.Provider>
}

export default SocialContextProvider
