import { createContext, useState, useReducer } from 'react'
import { ItemTypes } from './ItemTypes'
import generate from '@helper/generate'
import { dataTypes } from './ItemTypes'
export const CustomCVContext = createContext()

const CustomCVContextProvider = ({ children }) => {
  const [doubleClick, setDoubleClick] = useState(false)

  const [leftTab, setLeftTab] = useState(0)
  const [linkColor, setLinkColor] = useState({
    id: 0,
    for: '',
  })
  const [layerGroupDimension, setLayerGroupDimension] = useState()
  const [list, setList] = useState({})
  const [selected, setSelected] = useState()
  const [copy, setCopy] = useState()
  const [autoCreatement, setAutoCreatement] = useState(1)
  const getNewAutoCreatement = () => {
    let temp = autoCreatement
    setAutoCreatement(autoCreatement + 1)
    return temp
  }
  const data = {
    list,
    setList,
    selected,
    setSelected,
    doubleClick,
    setDoubleClick,
    layerGroupDimension,
    setLayerGroupDimension,
    leftTab,
    setLeftTab,
    linkColor,
    setLinkColor,
    autoCreatement,
    getNewAutoCreatement,
    setAutoCreatement,
    copy,
    setCopy,
  }

  return <CustomCVContext.Provider value={data}>{children}</CustomCVContext.Provider>
}

export default CustomCVContextProvider
