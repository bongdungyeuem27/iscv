import React from 'react'
import avatar from '@assets/avatar.png'

type Props = {
  //
}

const Top = (props: Props) => {
  return (
    <div className="flex gap-4 border-b-[1px] w-full px-3 py-3">
      <img src={avatar} className="w-11 h-11 rounded-full border-[1.5px]"></img>
      <div className="flex flex-col justify-between">
        <span>ISCV Assistant</span>
        <div className=" text-green-600 text-sm font-semibold">Online</div>
      </div>
    </div>
  )
}



export default Top
