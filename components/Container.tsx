import React from 'react'
import { HEADER_HEIGHT } from './Header'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: 10,
        paddingTop: HEADER_HEIGHT + 16,
      }}
    >
      {children}
    </div>
  )
}
