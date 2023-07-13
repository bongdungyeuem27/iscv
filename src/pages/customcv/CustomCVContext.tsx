import { IGetCustomCvQuery, useGetCustomCvQuery } from '@graphql/generated/schema'
import { RootState } from '@redux/store'
import { createContext, useState } from 'react'
import { useSelector } from 'react-redux'

export type ICustomCV = IGetCustomCvQuery['customCV']
export type ISkill = {
  id?: number | null
  employeeId?: number | null
  title?: string | null
  level?: number | null
}

type CustomCVContext = {
  cv?: ICustomCV
  list?: any
  setList?: any

  selected?: any
  setSelected?: any
  doubleClick?: any
  setDoubleClick?: any
  layerGroupDimension?: any
  setLayerGroupDimension?: any
  leftTab?: any
  setLeftTab?: any
  linkColor?: any
  setLinkColor?: any
  autoCreatement?: any
  getNewAutoCreatement?: any
  setAutoCreatement?: any
  copy?: any
  setCopy?: any
}

export const CustomCVContext = createContext<CustomCVContext>({})

type Props = { children: React.ReactNode }
const CustomCVContextProvider = ({ children }: Props) => {
  const [doubleClick, setDoubleClick] = useState(false)
  const employee = useSelector((state: RootState) => state.auth.employee)
  const customCVQuery = useGetCustomCvQuery({ variables: { employeeId: employee?.id ?? -1 } })

  const [leftTab, setLeftTab] = useState(0)
  const [linkColor, setLinkColor] = useState({
    id: 0,
    for: ''
  })
  const [layerGroupDimension, setLayerGroupDimension] = useState()
  const [list, setList] = useState({})
  const [selected, setSelected] = useState()
  const [copy, setCopy] = useState()
  const [autoCreatement, setAutoCreatement] = useState(1)
  const getNewAutoCreatement = () => {
    const temp = autoCreatement
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
    cv: customCVQuery?.data?.customCV
  }

  return <CustomCVContext.Provider value={data}>{children}</CustomCVContext.Provider>
}

export default CustomCVContextProvider
