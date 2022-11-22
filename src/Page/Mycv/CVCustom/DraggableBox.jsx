import { memo, useRef, useContext, useState } from 'react'
import { designTabComponents } from '@page/CustomCV/ItemTypes'

export const DraggableBox = memo(function DraggableBox({id,  data , profile}) {
  return (
    <div
      style={{
        position: "absolute",
        marginTop: data.top + 'px',
        marginLeft: data.left + 'px',
        width: data.width + 'px',
        height: data.height + 'px',
      }}
    >
      {designTabComponents[data.type].view(id, data, profile)}
    </div>
  )
})
