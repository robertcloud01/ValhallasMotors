"use client";

import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { CircleNotch } from "@phosphor-icons/react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: "primary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    href?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    isLoading,
    href,
    leftIcon,
    rightIcon,
    children,
    ...props
}: ButtonProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef<any>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        setPosition({ x: x * 0.15, y: y * 0.15 }); // Increased strength slightly
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden z-10";

    const variants = {
        primary: "bg-white text-black border border-white hover:bg-gold hover:text-white hover:border-gold",
        outline: "bg-transparent text-white border border-white/20 hover:border-gold hover:text-gold",
        ghost: "bg-transparent text-white hover:text-gold",
        link: "bg-transparent text-gold hover:text-white underline-offset-4 hover:underline p-0",
    };

    const sizes = {
        sm: "h-10 px-6 text-[10px]",
        md: "h-12 px-8 text-xs",
        lg: "h-14 px-10 text-sm",
    };

    const content = (
        <>
            {/* Hover Glow Effect */}
            <span className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg rounded-full transform scale-150" />

            {/* Content */}
            <div className="relative flex items-center z-10">
                {isLoading && <CircleNotch className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

                <span>{children}</span>

                {!isLoading && rightIcon && <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">{rightIcon}</span>}
            </div>
        </>
    );

    const motionProps = {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        animate: { x: position.x, y: position.y },
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } as any
    };

    if (href) {
        return (
            <Link href={href}>
                <motion.div
                    ref={ref as React.RefObject<HTMLDivElement>}
                    {...motionProps}
                    className={cn(baseStyles, variants[variant], sizes[size], className)}
                >
                    {content}
                </motion.div>
            </Link>
        );
    }

    return (
        <motion.button
            ref={ref as React.RefObject<HTMLButtonElement>}
            {...props}
            {...motionProps}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
        >
            {content}
        </motion.button>
    );
}
