import Image from 'next/image'
import { memo } from 'react'

interface HeaderProps {
  className: string
}
export const Header = memo(function Header({
  className,
}: HeaderProps) {
  const baseClasses =
    'flex justify-end h-header box-content px-12 py-4 bg-white'
  return (
    <a href="https://github.com/pureconnor/org-explorer">
      <div
        className={`${baseClasses} ${className}`}
        style={{ height: 60 }}
      >
        <div className="h-16 w-16 rounded-full shadow-md bg-gray-300">
          <Image
            className="block w-auto h-auto max-w-full max-h-full"
            src={'/me.webp'}
            alt="Profile Icon"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </a>
  )
})
