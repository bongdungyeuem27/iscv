import { EColor } from '@globaltypes/colors'
import clsx, { ClassValue } from 'clsx'
import React from 'react'

export enum EButton {
  Default,
  Rounded,
  Border,
  Square,
  Disabled
}

type Props = {
  type?: EButton
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  width?: number
  height?: number
  color?: EColor
  children?: React.ReactNode
  className?: ClassValue
  checked?: boolean
  hoverColor?: EColor
  outlineColor?: EColor
  colorText?: string
}

const Button = (props: Props) => {
  const {
    type = EButton.Default,
    onClick,
    width,
    height,
    color = EColor.Pink,
    children,
    className,
    checked,
    hoverColor,
    outlineColor,
    colorText
  } = props

  return (
    <button
      className={clsx(
        className,
        { disabled: type == EButton.Disabled },
        { ['rounded-full aspect-square']: type === EButton.Rounded },
        { ['rounded-2xl']: type === EButton.Default },
        { ['border-transparent']: type !== EButton.Border && !checked },
        { ['btn-outline']: type === EButton.Border && checked },
        'btn',
        'shadow-red-200 shadow-md shrink-0 min-h-0',
        {
          [`bg-${color}-300`]: true
        },
        {
          [`outline-${outlineColor}-400`]: outlineColor
        },
        {
          [`hover:bg-${hoverColor}-100`]: hoverColor
        },
        {
          [`text-${colorText}`]: colorText
        },
        {
          [`bg-white`]: color === EColor.White
        },
        { ['aspect-square']: type === EButton.Square }
      )}
      onClick={(e) => props.type !== EButton.Disabled && onClick?.(e)}
      style={{ width, height }}
    >
      {children}
    </button>
  )
}

export default Button
