import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link" | "luxury" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-stone-900 text-stone-50 hover:bg-stone-900/90": variant === "default",
            "border border-stone-200 bg-white hover:bg-stone-100 hover:text-stone-900": variant === "outline",
            "hover:bg-stone-100 hover:text-stone-900": variant === "ghost",
            "text-stone-900 underline-offset-4 hover:underline": variant === "link",
            "bg-gold-500 text-white hover:bg-gold-600 shadow-md uppercase tracking-wider font-semibold": variant === "luxury",
            "bg-[var(--color-atlas-green)] text-white hover:bg-[#5e6904] shadow-md uppercase tracking-wider font-semibold": variant === "secondary",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
