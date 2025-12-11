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
    const ref = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        setPosition({ x: x * 0.1, y: y * 0.1 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative inline-flex items-center justify-center font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";

    const variants = {
        primary: "bg-white text-black border border-transparent hover:bg-neutral-200 transition-colors duration-300",
        outline: "bg-transparent text-white border border-white/20 hover:border-gold hover:text-gold",
        ghost: "bg-transparent text-white hover:text-gold",
        link: "bg-transparent text-gold hover:text-white underline-offset-4 hover:underline p-0",
    };

    const sizes = {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-8 text-sm",
        lg: "h-14 px-10 text-base",
    };

    const content = (
        <>
            {/* Shimmer Text Effect */}
            {isLoading && <CircleNotch className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

            <span className="relative z-10 bg-gradient-to-r from-current via-white/80 to-current bg-[length:200%_auto] bg-clip-text group-hover:animate-text-shimmer group-hover:text-transparent transition-all duration-300">
                {children}
            </span>

            {!isLoading && rightIcon && <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">{rightIcon}</span>}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={cn(baseStyles, variants[variant], sizes[size], className)}>
                {content}
            </Link>
        );
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {content}
        </motion.button>
    );
}
