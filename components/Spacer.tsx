interface SpacerProps {
  size: string
}
export const Spacer = ({ size }: SpacerProps) => {
  return <div className={`h-${size}`} />
}
