import { ProgressBar } from '@components/ProgressBar'
import update from 'immutability-helper'
import { memo, useContext, useLayoutEffect } from 'react'
import { CustomCVContext, ISkill } from '../../CustomCVContext'
import { defaultStyle } from '../../config'

type Props = {
  id: string
  data: any
  selected?: string
  skills?: ISkill[]
}

const IIGItem = ({ id, data, selected, skills }: Props) => {
  const { list, setList } = useContext(CustomCVContext)
  useLayoutEffect(() => {
    if (!selected) return
    if (selected != id) setList(update(list, { [id]: { $merge: { typing: false } } }))
  }, [selected])
  const item = skills?.find((x) => x?.title?.toLowerCase() === data.choosen?.value)
  return (
    <div className="w-full h-full" style={defaultStyle(data)}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex gap-1 flex-1">
          <div className="w-[55px] uppercase">{item?.title}</div>
          <a>{item?.level || 0}/100</a>
        </div>
        <ProgressBar percent={Math.round(item?.level || 0)} className="w-full"></ProgressBar>
      </div>
    </div>
  )
}

export default memo(IIGItem)
