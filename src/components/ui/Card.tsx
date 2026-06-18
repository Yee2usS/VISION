import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  selected?: boolean
}

export default function Card({ className, hover, selected, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border rounded-xl p-6 transition-all duration-200',
        hover && 'hover:border-gold/50 hover:-translate-y-0.5 cursor-pointer',
        selected ? 'border-gold bg-gold/5' : 'border-[#1F1F23]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
