"use client"

import Image from "next/image"

interface AvatarProps {
    src?: string | null
}

const Avatar:React.FC<AvatarProps> = ({
    src
}) => {
  return (
    <Image 
    src={src || '/images/placeholder.jpg'}
    alt="Logo"
    width={30}
    height={30}
    className="rounded-full overflow-hidden"
    />
  )
}

export default Avatar