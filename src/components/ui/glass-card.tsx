import { cn } from "@/lib/utils"
import { ReactNode, CSSProperties } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  style?: CSSProperties
}

export function GlassCard({ children, className, glow = false, style }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-xl bg-glassmorphism border border-glassmorphism-border rounded-lg shadow-card",
        glow && "shadow-glow",
        className
      )}
      style={{
        background: "var(--glassmorphism)",
        borderColor: "var(--glassmorphism-border)",
        ...style
      }}
    >
      {children}
    </div>
  )
}