"use client"

import { IconType } from "react-icons/lib"

interface ButtonProps {
    disabled?: boolean
    outline?: boolean
    label: string | React.JSX.Element
    onClick: () => void
    small?: boolean,
    icon?: IconType
}

const Button:React.FC<ButtonProps> = ({
    disabled,
    outline,
    label,
    onClick,
    small,
    icon:Icon
}) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full flex items-center justify-center
    ${outline ? 'bg-white border-black text-black' : 'bg-green-800 border-green-800 text-white'}
    ${small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-2'}`}>
        {Icon && (
            <Icon 
            size={24}
            className="absolute top-4 left-3"
            />
        )}
        {label}
    </button>
  )
}

export default Button