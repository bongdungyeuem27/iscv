import { ProgressBar } from '@components/ProgressBar'
import update from 'immutability-helper'
import { memo, useContext, useLayoutEffect } from 'react'
import { EIIG, IIIG } from 'src/types/certificate/iig'
import { CustomCVContext } from '../../CustomCVContext'
import { defaultStyle } from '../../config'

type Props = {
  id: string
  data: any
  selected?: string
  iig?: IIIG
  category: EIIG
}

const IIGItem = ({ id, data, selected, iig, category }: Props) => {
  const { list, setList } = useContext(CustomCVContext)
  useLayoutEffect(() => {
    if (!selected) return
    if (selected != id) setList(update(list, { [id]: { $merge: { typing: false } } }))
  }, [selected])
  const max =
    (category === EIIG.L && 495) ||
    (category === EIIG.R && 495) ||
    (category === EIIG.S && 200) ||
    (category === EIIG.W && 200)
  const level =
    (category === EIIG.L && iig?.lr?.listeningScore) ||
    (category === EIIG.R && iig?.lr?.readingScore) ||
    (category === EIIG.S && iig?.sw?.speakingScore) ||
    (category === EIIG.W && iig?.sw?.writingScore)
  const skill =
    (category === EIIG.L && 'Listening') ||
    (category === EIIG.R && 'Reading') ||
    (category === EIIG.S && 'Speaking') ||
    (category === EIIG.W && 'Writing')
  return (
    <div className="w-full h-full" style={defaultStyle(data)}>
      {iig && (
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex gap-1 flex-1">
            <div className="w-[55px]">{skill}</div>
            <a>
              {level}/{max}
            </a>
          </div>
          {max && <ProgressBar percent={Math.round((100 / max) * 100)}></ProgressBar>}
        </div>
      )}
    </div>
  )
}

export default memo(IIGItem)
