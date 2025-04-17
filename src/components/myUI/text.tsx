import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  size:
    | "hero"
    | "display"
    | "title"
    | "subtitle"
    | "label"
    | "body"
    | "caption"
    | "small"
    | "tiny";
  weight?: "thin" | "regular" | "bold" | "extra";
  color?: string;
  typing?: boolean;
  onTypingComplete?: () => void;
  children?: string;
}

const Text = ({
  size,
  weight = "regular",
  color,
  typing = false,
  onTypingComplete,
  children,
  className,
  ...props
}: TextProps & React.ComponentProps<"span">) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const sizeStyles = {
    hero: "text-5xl md:text-6xl lg:text-7xl",
    display: "text-4xl md:text-5xl lg:text-6xl",
    title: "text-2xl md:text-3xl lg:text-4xl",
    subtitle: "text-xl md:text-2xl lg:text-3xl",
    label: "text-base md:text-lg lg:text-xl",
    body: "text-sm md:text-base lg:text-lg",
    caption: "text-xs md:text-sm lg:text-base",
    small: "text-2xs md:text-xs lg:text-sm",
    tiny: "text-3xs md:text-2xs lg:text-xs",
  };

  const weightStyles = {
    thin: "font-light",
    regular: "font-normal",
    bold: "font-bold",
    extra: "font-extrabold",
  };

  useEffect(() => {
    if (!typing) {
      setDisplayedText(children as string);
      setIsTypingComplete(true);
      return;
    }

    const text = children as string;
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        const randomDelay = Math.random() * 100 + 25;
        setTimeout(typeNextChar, randomDelay);
      }
    };

    typeNextChar();

    return () => {
      currentIndex = text.length;
    };
  }, [children, typing]);

  useEffect(() => {
    if (displayedText === children) {
      setIsTypingComplete(true);
      onTypingComplete?.();
    }
  }, [displayedText]);

  return (
    <span
      className={cn(
        sizeStyles[size],
        weightStyles[weight],
        color ? `text-${color}` : "text-inherit",
        typing && "inline-flex items-center",
        className
      )}
      {...props}
    >
      {displayedText}
      {typing && !isTypingComplete && (
        <span
          className={cn(
            "inline-block w-1 h-4 ml-1 animate-blink",
            sizeStyles[size].includes("5xl") ? "h-8" : "h-4",
            color ? `bg-${color}` : "bg-current"
          )}
        />
      )}
    </span>
  );
};

export default Text;
