import { memo, useRef, useContext, useState } from 'react'

export const DraggableBox = memo(function DraggableBox({
  id,
  data,
  profile,
}: {
  id: number
  data: any
  profile: any
}) {
  return (
    <div
      style={{
        position: 'absolute',
        marginTop: data.top + 'px',
        marginLeft: data.left + 'px',
        width: data.width + 'px',
        height: data.height + 'px',
      }}
    >
      {/* {designTabComponents[data.type].view(id, data, profile)} */}
    </div>
  )
})
