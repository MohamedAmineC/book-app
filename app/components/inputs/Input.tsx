"use client"

import Image from "next/image"
import { FieldErrors, FieldValues, UseFormRegister,UseFormResetField } from "react-hook-form"
import { IoMdClose } from "react-icons/io"

interface InputProps {
    id: string,
    label: string,
    type?: string,
    required?: boolean,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    thumbnail?: string,
    reset?:() => void
}

const Input:React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    required = false,
    disabled = false,
    register,
    errors,
    thumbnail,
    reset
}) => {
    const handleClick = () => {
        reset ? reset() : undefined
    }
  return (
    <div className="w-full relative">
        {thumbnail && (
            <Image 
            src={thumbnail}
            alt="Book Image"
            width={25}
            height={25}
            className="object-cover absolute top-4 left-2"
            />
        )}
        <input 
        id={id}
        type={type}
        required={required}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${thumbnail ? 'pl-11': 'pl-4'}
        ${errors[id] ? 'border-rose-500 focus:boder-rose-500': 'border-green-800 focus:border-black'}`}
        />
        <label htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0]
        ${thumbnail ? 'left-11' : 'left-4'}
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4`}>
            {label}
        </label>
        { reset && (
            <IoMdClose 
            size={18}
            onClick={handleClick}
            className="absolute top-6 cursor-pointer right-5"
            />
        )}
    </div>
  )
}

export default Input