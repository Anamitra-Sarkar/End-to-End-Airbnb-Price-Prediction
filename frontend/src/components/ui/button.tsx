import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/utils/cn"

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
    variant?: "default" | "outline" | "ghost" | "airbnb"
    size?: "default" | "sm" | "lg" | "icon"
    children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", children, ...props }, ref) => {
        const variants = {
            default: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
            outline: "border border-neutral-200 bg-transparent hover:bg-neutral-100 text-neutral-900 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800",
            ghost: "hover:bg-neutral-100 text-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-100",
            airbnb: "bg-airbnb text-white hover:bg-airbnb-dark shadow-md hover:shadow-lg",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-12 rounded-md px-8 text-lg",
            icon: "h-10 w-10",
        }

        return (
            <motion.button
                className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...props}
            >
                {variant === 'airbnb' && (
                    <motion.div
                        className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button }
