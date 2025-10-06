"use client"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      className={`flex items-center gap-2 text-sm font-medium select-none ${className || ""}`}
      {...props}
    />
  )
}
