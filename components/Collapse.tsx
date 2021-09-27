import { HTMLAttributes } from 'react'

interface CollapseProps {
  children: React.ReactNode
  className?: string
}

export const Collapse = ({
  children,
  className,
}: CollapseProps) => {
  const baseClasses = 'md:h-5/6 mx-auto bg-white '

  return (
    <div
      className={
        className
          ? baseClasses.concat(className)
          : baseClasses
      }
    >
      <div className="flex md:flex-row flex-col h-full">
        {children}
      </div>
    </div>
  )
}
