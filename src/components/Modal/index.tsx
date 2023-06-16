import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
  title?: React.ReactNode
  className?: string
}

function useOutsideAlerter(ref: React.MutableRefObject<HTMLElement | null>, action: () => any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target!)) {
        action()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

const Modal = (props: Props) => {
  const { setShow, children, title } = props
  const ref = useRef<HTMLDivElement>(null)
  useOutsideAlerter(ref, () => setShow(false))

  return (
    <div className="fixed inset-0 z-20 bg-blend-color overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div
        ref={ref}
        className={clsx(
          ' relative w-[90%] my-12 bg-white min-h-[10rem] mx-auto rounded-2xl shadow-2xl',
          props.className
        )}
      >
        <div className="w-full bg-gradient-blue h-14 relative flex items-center rounded-tl-xl rounded-tr-xl">
          <i
            className="fa-regular fa-xmark absolute z-30 right-6 text-white text-2xl cursor-pointer"
            onClick={() => setShow(false)}
          ></i>
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
