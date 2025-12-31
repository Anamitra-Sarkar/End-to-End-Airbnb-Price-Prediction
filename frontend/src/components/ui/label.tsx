import * as React from "react"
import { cn } from "@/utils/cn"

const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-600 dark:text-neutral-300 mb-2 block",
            className
        )}
        {...props}
    />
))
Label.displayName = "Label"

export { Label }
